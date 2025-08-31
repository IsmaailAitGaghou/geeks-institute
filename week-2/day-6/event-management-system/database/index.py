import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_conn():
    """Establishes and returns a connection to the PostgreSQL database."""
    conn = psycopg2.connect(
        host=os.getenv("PGHOST"),
        user=os.getenv("PGUSER"),
        password=os.getenv("PGPASSWORD"),
        database=os.getenv("PGDATABASE"),
        sslmode=os.getenv("PGSSLMODE"),
        channel_binding=os.getenv("PGCHANNELBINDING")
    )
    return conn