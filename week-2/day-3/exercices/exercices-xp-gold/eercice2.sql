SELECT 
    s.store_id,
    ci.city,
    co.country,
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id



SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    ci.city
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city IN (
    SELECT ci2.city
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city ci2 ON a2.city_id = ci2.city_id
);


SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country IN (
    SELECT co2.country
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city ci2 ON a2.city_id = ci2.city_id
    JOIN country co2 ON ci2.country_id = co2.country_id
);


SELECT f.film_id, f.title, f.length
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category cat ON fc.category_id = cat.category_id
    WHERE cat.name = 'Horror'
)
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%';