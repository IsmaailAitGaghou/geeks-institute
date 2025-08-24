SELECT rental_id, rental_date, inventory_id, customer_id, staff_id
FROM rental
WHERE return_date IS NULL
ORDER BY rental_date;

SELECT c.customer_id, c.first_name, c.last_name, count(r.rental_id) as outstanding_rentals
FROM customer c
INNER JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NOT NULL
GROUP BY c.first_name, c.last_name, c.customer_id
ORDER BY outstanding_rentals DESC

-- 

SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE a.first_name = 'Joe'
  AND a.last_name = 'Swank'
  AND cat.name = 'Action';

SELECT title
FROM film_list
WHERE category = 'Action'
  AND actors ILIKE '%Joe Swank%';

