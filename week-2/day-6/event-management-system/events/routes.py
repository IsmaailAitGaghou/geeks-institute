from flask import Blueprint, request, jsonify
from database.index import get_db_conn
from middlewares import api_middleware

events_bp = Blueprint("events", __name__)


@events_bp.route("/", methods=["GET"])
@api_middleware
def api_list_events():
    q = request.args.get("q", "").strip()
    conn = get_db_conn()
    cur = conn.cursor()
    where = ""
    params = []
    if q:
        where = "WHERE LOWER(e.name) LIKE %s"
        params.append("%" + q.lower() + "%")
    cur.execute(
        f"""
        SELECT e.event_id, e.name, e.date, e.location, o.name AS organizer_name
        FROM events e
        JOIN organizers o ON e.organizer_id=o.organizer_id
        {where}
        ORDER BY e.date ASC
    """,
        params,
    )
    rows = cur.fetchall()
    cur.close()
    events = [
        {
            "event_id": r[0],
            "name": r[1],
            "date": r[2].isoformat() if r[2] else None,
            "location": r[3],
            "organizer_name": r[4],
        }
        for r in rows
    ]
    return jsonify({"events": events})


@events_bp.route("/<int:event_id>", methods=["GET"])
@api_middleware
def api_get_event(event_id):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        f"""
        SELECT e.event_id, e.name, e.date, e.location, o.name AS organizer_name
        FROM events e
        JOIN organizers o ON e.organizer_id=o.organizer_id
        WHERE e.event_id=%s
    """,
        (event_id,),
    )
    event = cur.fetchone()
    cur.close()
    if event:
        return jsonify(
            {
                "event_id": event[0],
                "name": event[1],
                "date": event[2].isoformat() if event[2] else None,
                "location": event[3],
                "organizer_name": event[4],
            }
        )
    return jsonify({"error": "Event not found"}), 404


@events_bp.route("/", methods=["POST"])
@api_middleware
def api_create_event():
    data = request.get_json()
    name = data.get("name")
    date = data.get("date")
    location = data.get("location")
    organizer_id = data.get("organizer_id")
    description = data.get("description", "")

    if not (name and date and location and organizer_id and description):
        return jsonify({"error": "All fields are required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO events (name, date, location, description, organizer_id) VALUES (%s, %s, %s, %s, %s) RETURNING event_id",
            (name, date, location, description, organizer_id),
        )
        event_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"event_id": event_id, "organizer_id": organizer_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()



@events_bp.route("/<int:event_id>", methods=["DELETE"])
@api_middleware
def api_delete_event(event_id):
    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM events WHERE event_id=%s", (event_id,))
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()


@events_bp.route("/<int:event_id>", methods=["PUT"])
@api_middleware
def api_update_event(event_id):
    data = request.get_json()
    name = data.get("name")
    date = data.get("date")
    location = data.get("location")
    organizer_id = data.get("organizer_id")
    description = data.get("description", "")

    if not (name and date and location and organizer_id and description):
        return jsonify({"error": "All fields are required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            """
            UPDATE events
            SET name=%s, date=%s, location=%s, description=%s, organizer_id=%s
            WHERE event_id=%s
        """,
            (name, date, location, description, organizer_id, event_id),
        )
        conn.commit()
        return jsonify({"event_id": event_id, "organizer_id": organizer_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
