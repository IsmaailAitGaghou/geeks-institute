from config import get_db_connection
from menu_item import MenuItem

class MenuManager:

    @classmethod
    def get_by_name(cls, name):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            query = f"SELECT * FROM menu_items WHERE item_name = '{name}'"
            cursor.execute(query)
            result = cursor.fetchone()
            conn.close()
            if result:
                return MenuItem(result[0], result[1])
            return None
        except Exception as e:
            print(f"Error fetching menu item by name: {e}")
            return None


    @staticmethod
    def all_items():
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            query = "SELECT item_name, item_price FROM menu_items"
            cursor.execute(query)
            result = cursor.fetchall()
            conn.close()

            return [MenuItem(item[0], item[1]) for item in result]

        except Exception as e:
            print(f"Error fetching all menu items: {e}")
            return []
            
