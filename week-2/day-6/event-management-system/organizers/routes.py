from flask import Blueprint, request, jsonify
from middlewares import api_middleware
from database.index import get_db_conn


organizers_bp = Blueprint("organizers", __name__)
@organizers_bp.route("/", methods=["GET"])
@api_middleware
def api_list_organizers():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT organizer_id, name, contact_info FROM organizers ORDER BY name")
    rows = cur.fetchall()
    cur.close()
    organizers = [{"id": r[0], "name": r[1], "contact_info": r[2]} for r in rows]
    return jsonify({"organizers": organizers})



@organizers_bp.route("/<int:organizer_id>", methods=["GET"])
@api_middleware
def api_get_organizer(organizer_id):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        "SELECT organizer_id, name, contact_info FROM organizers WHERE organizer_id=%s",
        (organizer_id,),
    )
    org = cur.fetchone()
    cur.close()
    if org:
        return jsonify({"id": org[0], "name": org[1], "contact_info": org[2]})
    return jsonify({"error": "Organizer not found"}), 404


@organizers_bp.route("/", methods=["POST"])
@api_middleware
def api_create_organizer():
    data = request.get_json()
    name = data.get("name")
    contact_info = data.get("contact_info", "")
    if not name:
        return jsonify({"error": "Name is required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO organizers (name, contact_info) VALUES (%s, %s) RETURNING organizer_id",
            (name, contact_info),
        )
        org_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"id": org_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()


@organizers_bp.route("/<int:organizer_id>", methods=["PUT"])
@api_middleware
def api_update_organizer(organizer_id):
    data = request.get_json()
    name = data.get("name")
    contact_info = data.get("contact_info", "")

    if not name:
        return jsonify({"error": "Name is required"}), 400

    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "UPDATE organizers SET name=%s, contact_info=%s WHERE organizer_id=%s",
            (name, contact_info, organizer_id),
        )
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()



@organizers_bp.route("/<int:organizer_id>", methods=["DELETE"])
@api_middleware
def api_delete_organizer(organizer_id):
    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM organizers WHERE organizer_id=%s", (organizer_id,))
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
