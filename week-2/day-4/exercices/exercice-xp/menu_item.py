from config import get_db_connection

class MenuItem:
    def __init__(self, item_name, item_price):
        self.item_name = item_name
        self.item_price = item_price

    def save(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            query = f"INSERT INTO menu_items (item_name, item_price) VALUES ('{self.item_name}', {self.item_price})"
            cursor.execute(query)
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"Error adding item: {e}")

    def update(self, new_name, new_price):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            query = f"UPDATE menu_items SET item_name = '{new_name}', item_price = {new_price} WHERE item_name = '{self.item_name}'"
            cursor.execute(query)
            conn.commit()

            self.item_name = new_name
            self.item_price = new_price
            conn.close()

        except Exception as e:
            print(f"Error updating menu item: {e}")

    
    def delete(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            query = f"DELETE FROM menu_items WHERE item_name = '{self.item_name}'"
            cursor.execute(query)
            conn.commit()
            conn.close()

        except Exception as e:
            print(f"Error deleting menu item: {e}")