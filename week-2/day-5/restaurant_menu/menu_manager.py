from config import get_db_connection
from menu_item import MenuItem

class MenuManager:
    @staticmethod
    def get_by_id(item_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT id, item_name, item_price FROM menu_items WHERE id = %s"
        cursor.execute(query, (item_id,))
        result = cursor.fetchone()
        conn.close()

        if result:
            return MenuItem(item_id=result[0], name=result[1], price=result[2])
        return None

    @staticmethod
    def all_items():
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT id, item_name, item_price FROM menu_items"
        cursor.execute(query)
        results = cursor.fetchall()
        conn.close()

        return [MenuItem(item_id=item[0], name=item[1], price=item[2]) for item in results]