from flask import Blueprint, request, jsonify
from middlewares import api_middleware
from database.index import get_db_conn


attendees_bp = Blueprint("attendees", __name__)
@attendees_bp.route("/", methods=["GET"])
@api_middleware
def api_list_attendees():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT attendee_id, name, email, phone FROM attendees ORDER BY name")
    rows = cur.fetchall()
    cur.close()
    attendees = [{"attendee_id": r[0], "name": r[1], "email": r[2], "phone": r[3]} for r in rows]
    return jsonify({"attendees": attendees})



@attendees_bp.route("/<int:attendee_id>", methods=["GET"])
@api_middleware
def api_get_attendee(attendee_id):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        "SELECT attendee_id, name, email, phone FROM attendees WHERE attendee_id=%s", (attendee_id,)
    )
    row = cur.fetchone()
    cur.close()
    if row:
        return jsonify({"attendee_id": row[0], "name": row[1], "email": row[2], "phone": row[3]})
    return jsonify({"error": "Attendee not found"}), 404


@attendees_bp.route("/", methods=["POST"])
@api_middleware
def api_create_attendee():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")

    if not (name and email):
        return jsonify({"error": "Name and email are required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO attendees (name, email, phone) VALUES (%s, %s, %s) RETURNING attendee_id",
            (name, email, phone),
        )
        attendee_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"attendee_id": attendee_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()



@attendees_bp.route("/<int:attendee_id>", methods=["PUT"])
@api_middleware
def api_update_attendee(attendee_id):
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")

    if not (name and email):
        return jsonify({"error": "Name and email are required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "UPDATE attendees SET name=%s, email=%s, phone=%s WHERE attendee_id=%s",
            (name, email, phone, attendee_id),
        )
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()



@attendees_bp.route("/<int:attendee_id>", methods=["DELETE"])
@api_middleware
def api_delete_attendee(attendee_id):
    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM attendees WHERE attendee_id=%s", (attendee_id,))
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
