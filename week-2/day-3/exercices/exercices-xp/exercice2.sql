update film SET language_id = 5
WHERE title ILIKE '%sumo%'
   OR (length < 60 AND rating = 'R');

DROP TABLE customer_review;
-- we have to use CASCADE if there are CONSTRAINTS

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

SELECT DISTINCT f.title, f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope'
  AND a.last_name = 'Monroe'
  AND (f.description ILIKE '%sumo%' AND f.description ILIKE '%wrestler%');


SELECT title, length, rating, description
FROM film
WHERE length < 60
  AND rating = 'R'
  AND (description ILIKE '%documentary%' OR title ILIKE '%documentary%')
ORDER BY length;


SELECT f.title 
FROM customer c
inner join payment p on p.customer_id = c.customer_id
inner join rental r on r.rental_id = p.rental_id
inner join inventory i on i.inventory_id = r.inventory_id
inner join film f on f.film_id = i.film_id
where c.first_name = 'Matthew' and c.last_name = 'Mahan'
    and p.payment_id > 4.00
    and r.rental_date >= '2005-07-28' and r.rental_date <= '2005-08-01'

SELECT f.title, f.replacement_cost
from customer c 
inner join rental r on c.customer_id = r.customer_id
inner join inventory i on i.inventory_id = r.inventory_id
inner join film f on f.film_id = i.film_id
where c.first_name = 'Matthew' and c.last_name = 'Mahan' 
 and (f.title ILIKE '%boat%' or f.description ILIKE '%boat%')
