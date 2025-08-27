import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db_conn():
    """Establishes and returns a connection to the PostgreSQL database."""
    conn = psycopg2.connect(
        host=os.environ.get('PGHOST'),
        database=os.environ.get('PGDATABASE'),
        user=os.environ.get('PGUSER'),
        password=os.environ.get('PGPASSWORD'),
        sslmode=os.environ.get('PGSSLMODE'),
        channel_binding=os.environ.get('PGCHANNELBINDING')
    )
    return conn