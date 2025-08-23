-- 1)
SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating
ORDER BY rating;
-- 2)
SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG-13')
ORDER BY title;

SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title;
-- 3)
SELECT customer_id, first_name, last_name, email
FROM customer
ORDER BY customer_id
LIMIT 1;

UPDATE customer
SET 
    first_name = 'Ismaail',
    last_name = 'Ait gaghou',
    email = 'aitgaghou123@gmail.com',
    last_update = NOW()
WHERE customer_id = 1;

-- 4)
SELECT address_id
FROM customer
WHERE customer_id = 1;

UPDATE address
SET 
    address = 'IMMS HAY ANNASR',
    address2 = 'IMM 117 APPT 17',
    district = 'TEMARA',
    city_id = 456,           -- You can check city_id for Brooklyn
    postal_code = '12010',
    phone = '555-1234',
    last_update = NOW()
WHERE address_id = 5;