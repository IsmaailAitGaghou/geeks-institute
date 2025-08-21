SELECT *
FROM customer

SELECT (first_name, last_name) as full_name
FROM customer

SELECT distinct create_date
from customer

SELECT *
FROM customer
ORDER BY first_name DESC

SELECT film_id,
    title,
    description,
    release_year,
    rental_rate
FROM film
ORDER BY rental_rate ASC

SELECT address,
    phone
FROM address
WHERE district = "Texas"

SELECT *
FROM film
WHERE film_id in (15, 150)

SELECT film_id,
    title,
    description,
    length,
    rental_rate
FROM film
WHERE title = "John Wick"

SELECT film_id,
    title,
    description,
    length,
    rental_rate
FROM film LIKE "Jo%"

SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10

SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10 OFFSET 10

SELECT c.first_name,
    c.last_name,
    p.amount,
    p.payment_date
FROM customer c
    INNER JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id ASC

SELECT f.film_id,
    f.title
FROM film f
    LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL

SELECT c.city,
    co.country
FROM city c
    INNER JOIN country co ON c.country_id = co.country_id