CREATE TABLE items (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE customers (
customer_id INT PRIMARY KEY,
customer_last_name VARCHAR(50) NOT NULL,
customer_first_name VARCHAR(50) NOT NULL
);

INSERT INTO items (item_id, item_name, price) VALUES
(1, 'Small Desk', 100),
(2, 'Large desk', 300),
(3, 'Fan ', 80);

INSERT INTO customers (customer_id, customer_last_name, customer_first_name) VALUES
(1, 'Greg', 'Jones'),
(2, 'Sandra', 'Jones'),
(3, 'Scott', 'Scott'),
(4, 'Trevor', 'Green'),
(5, 'Melanie', 'Johnson');


SELECT * FROM items;
SELECT * FROM customers;

SELECT * FROM items WHERE price > 80
SELECT * FROM items WHERE price <= 300

SELECT * FROM customers WHERE customer_last_name = "Smith";
SELECT * FROM customers WHERE customer_last_name = "Jones";

SELECT * FROM customers WHERE NOT customer_first_name = "Scott";