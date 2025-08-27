import os
from database.index import get_db_conn

def initialize_database():
    """
    Initializes the database by executing the schema and seed SQL file.
    """
    # Correctly locate the SQL file relative to this script
    sql_file_path = os.path.join(os.path.dirname(__file__), 'seed', 'index.sql')
    
    try:
        with open(sql_file_path, 'r') as f:
            sql_script = f.read()
    except FileNotFoundError:
        print(f"Error: SQL file not found at {sql_file_path}")
        return

    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute(sql_script)
        conn.commit()
        cur.close()
        conn.close()
        print("Database initialized and seeded successfully.")
    except Exception as e:
        print(f"An error occurred during database initialization: {e}")

if __name__ == '__main__':
    initialize_database()