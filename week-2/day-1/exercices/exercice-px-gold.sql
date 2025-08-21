-- Select
SELECT first_name,
    last_name,
    date_birth
FROM students
ORDER BY last_name ASC
LIMIT 4;

SELECT first_name,
    last_name,
    date_birth
FROM students
ORDER BY date_birth DESC
LIMIT 1

SELECT first_name,
    last_name,
    date_birth
FROM students
LIMIT 3 OFFSET 2;