CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),

    FOREIGN KEY (order_id) REFERENCES product_orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)


INSERT INTO product_orders (user_id, order_date)
VALUES (1, '2025-04-05 14:30:00');

INSERT INTO items (order_id, product_name, price, quantity) VALUES
(1, 'Laptop', 999.99, 1),
(1, 'Mouse', 25.50, 2),
(1, 'USB Cable', 15.00, 3);

CREATE OR REPLACE FUNCTION get_order_total(order_id_param INT)
RETURNS DECIMAL(10,2)
AS $$
DECLARE
    total DECIMAL(10,2) := 0;
BEGIN
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total
    FROM items
    WHERE order_id = order_id_param;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

SELECT get_order_total(1) AS total_amount;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL
)
