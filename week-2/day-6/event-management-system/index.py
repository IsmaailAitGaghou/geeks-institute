from flask import Flask, jsonify
import os
from flask import Flask
from dotenv import load_dotenv
# from auth.routes import auth_bp, login_manager, ensure_admin_seed
from events.routes import events_bp
from organizers.routes import organizers_bp
from attendees.routes import attendees_bp
from tickets.routes import tickets_bp
from middlewares import api_middleware_global


app = Flask(__name__)
# app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(events_bp, url_prefix="/api/events")
app.register_blueprint(organizers_bp, url_prefix="/api/organizers")
app.register_blueprint(attendees_bp, url_prefix="/api/attendees")
app.register_blueprint(tickets_bp, url_prefix="/api/tickets")
# app.register_blueprint(stats_bp, url_prefix="/api/stats")
app = api_middleware_global(app)

# api_middleware_global(app)

@app.route('/')
def home():
    return jsonify({"message": "API is working!"})

# @app.route("/api/test", methods=["GET"])
# def api_test():
#     return jsonify({"message": "API is working!"})


if __name__ == '__main__':
    app.run(debug=True)
