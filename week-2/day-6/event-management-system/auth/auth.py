from flask import Blueprint, request, jsonify
from middlewares import api_middleware
from database.index import get_db_conn
from werkzeug.security import generate_password_hash


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/", methods=["GET"])
@api_middleware
def api_list_users():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email FROM users ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()
    users = [{"id": r[0], "username": r[1], "email": r[2]} for r in rows]
    return jsonify({"users": users})


@auth_bp.route("/", methods=["POST"])
@api_middleware
def api_create_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400
    conn = get_db_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (%s,%s,%s) RETURNING id",
            (username, email, generate_password_hash(password)),
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"id": user_id, "username": username, "email": email}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()


@auth_bp.route("/<int:user_id>", methods=["GET"])
@api_middleware
def api_get_user(user_id):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()
    cur.close()
    if user:
        return jsonify({"id": user[0], "username": user[1], "email": user[2]})
    return jsonify({"error": "User not found"}), 404
