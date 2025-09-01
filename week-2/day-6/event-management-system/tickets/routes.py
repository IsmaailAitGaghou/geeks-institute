from flask import Blueprint, request, jsonify
from middlewares import api_middleware
from database.index import get_db_conn

tickets_bp = Blueprint("tickets", __name__)

@tickets_bp.route('/', methods=['GET'])
@api_middleware
def api_list_tickets():
    conn = get_db_conn(); 
    cur = conn.cursor()
    cur.execute(
        """
        SELECT t.ticket_id, e.name AS event_name, a.name AS attendee_name, t.created_at
        FROM tickets t
        JOIN events e ON t.event_id=e.id
        JOIN attendees a ON t.attendee_id=a.id
        ORDER BY t.created_at DESC
    """
    )
    rows = cur.fetchall(); cur.close()
    tickets = [{"id": r[0], "event_name": r[1], "attendee_name": r[2], "created_at": r[3].isoformat()} for r in rows]
    return jsonify({"tickets": tickets})

# Get ticket by id
@tickets_bp.route('/api/tickets/<int:ticket_id>', methods=['GET'])
@api_middleware
def api_get_ticket(ticket_id):
    conn = get_db_conn(); 
    cur = conn.cursor()
    cur.execute("""
        SELECT t.id, e.name AS event_name, a.name AS attendee_name, t.created_at
        FROM tickets t
        JOIN events e ON t.event_id=e.id
        JOIN attendees a ON t.attendee_id=a.id
        WHERE t.id=%s
    """, (ticket_id,))
    row = cur.fetchone(); cur.close()
    if row:
        return jsonify({"id": row[0], "event_name": row[1], "attendee_name": row[2], "created_at": row[3].isoformat()})
    return jsonify({"error": "Ticket not found"}), 404

# Create ticket
@tickets_bp.route('/api/tickets', methods=['POST'])
@api_middleware
def api_create_ticket():
    data = request.get_json()
    event_id = data.get("event_id")
    attendee_id = data.get("attendee_id")

    if not (event_id and attendee_id):
        return jsonify({"error": "event_id and attendee_id are required"}), 400

    conn = get_db_conn(); 
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO tickets (event_id, attendee_id) VALUES (%s, %s) RETURNING ticket_id",
            (event_id, attendee_id),
        )
        ticket_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"id": ticket_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close(); 

# Delete ticket
@tickets_bp.route('/api/tickets/<int:ticket_id>', methods=['DELETE'])
@api_middleware
def api_delete_ticket(ticket_id):
    conn = get_db_conn(); 
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM tickets WHERE ticket_id=%s", (ticket_id,))
        conn.commit()
        return jsonify({"success": True}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
