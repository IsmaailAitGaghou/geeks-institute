import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="restaurant_menu",
        user="postgres",
        password="1234"
    )
    return conn
