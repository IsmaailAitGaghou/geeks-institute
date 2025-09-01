from functools import wraps
from flask import request, jsonify
from database.index import get_db_conn


def api_middleware(f):
    """
    Protects an API route by validating the X-API-KEY header against the database.
    Returns HTTP 401 if the header is missing or the key is invalid.
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        # Ensure the X-API-KEY header is present
        api_key = request.headers.get("X-API-KEY")
        if not api_key:
            return jsonify({"error": "Unauthorized"}), 401

        # Verify API key in database
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute("SELECT id FROM api_keys WHERE key_value=%s", (api_key,))
        result = cur.fetchone()
        cur.close()

        # 3️⃣ If key invalid → return 401
        if not result:
            return jsonify({"error": "Unauthorized"}), 401

        # 4️⃣ Key valid → proceed to the route
        return f(*args, **kwargs)

    return decorated


# -------------------------
# Optional: Global middleware for all /api/* routes
# -------------------------
def api_middleware_global(app):
    """
    Attach this function in create_app to protect all routes starting with /api/
    """

    @app.before_request
    def check_api_key_global():
        if request.path.startswith("/api/"):
            api_key = request.headers.get("X-API-KEY")
            if not api_key:
                return jsonify({"error": "Unauthorized"}), 401

            conn = get_db_conn()
            cur = conn.cursor()
            cur.execute("SELECT id FROM api_keys WHERE key_value=%s", (api_key,))
            result = cur.fetchone()
            cur.close()

            if not result:
                return jsonify({"error": "Unauthorized"}), 401
    return app
