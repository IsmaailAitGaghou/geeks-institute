from config import get_db_connection

class MenuItem:
    def __init__(self, name, price, item_id=None):
        self.id = item_id
        self.name = name
        self.price = price

    def save(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s)"
        cursor.execute(query, (self.name, self.price))
        conn.commit()
        conn.close()

    def update(self, new_name, new_price):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "UPDATE menu_items SET item_name = %s, item_price = %s WHERE id = %s"
        cursor.execute(query, (new_name, new_price, self.id))
        conn.commit()
        conn.close()

    def delete(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "DELETE FROM menu_items WHERE id = %s"
        cursor.execute(query, (self.id,))
        conn.commit()
        conn.close()