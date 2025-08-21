SELECT *
FROM items
ORDER BY price ASC

SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC

SELECT customer_first_name as first_name,
    customer_last_name as last_name
FROM customers
ORDER BY first_name DESC
LIMIT 3

SELECT customer_last_name as last_name
FROM customers
ORDER BY last_name ASC