CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    item_price NUMERIC(10, 2) NOT NULL
);


INSERT INTO menu_items (item_name, item_price) VALUES
    ('Pizza', 9.99),
    ('Burger', 5.99),
    ('Pasta', 7.49);