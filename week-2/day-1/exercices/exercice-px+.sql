CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_birth DATE NOT NULL
) -- Insert
INSERT INTO students (first_name, last_name, date_birth)
VALUES ('Marc', 'Benichou', '1998-11-02'),
    ('Yoan', 'Cohen', '2010-12-03'),
    ('Lea', 'Benichou', '1987-07-27'),
    ('Amelia', 'Dux', '1996-04-07'),
    ('David', 'Grez', '2003-06-14'),
    ('Omer', 'Simpson', '1980-10-03');
INSERT INTO students (first_name, last_name, date_birth)
VALUES ('Ismaail', 'Ait gaghou', '2000-12-08');
-- Select
SELECT *
FROM students
Select first_name,
    last_name
FROM students
Select first_name,
    last_name
FROM students
WHERE student_id = 2
Select first_name,
    last_name
FROM students
WHERE last_name = 'Benichou'
    AND first_name = 'Marc'
Select first_name,
    last_name
FROM students
WHERE last_name = 'Benichou'
    OR first_name = 'Marc'
Select first_name,
    last_name
FROM students
WHERE first_name LIKE '%a%'
Select first_name,
    last_name
FROM students
WHERE first_name ILIKE 'a%'
Select first_name,
    last_name
FROM students
WHERE first_name ILIKE '%a'
Select first_name,
    last_name
FROM students
WHERE first_name ILIKE '%a_'
Select first_name,
    last_name
FROM students
WHERE student_id IN (1, 3)
SELECT *
FROM students
WHERE date_birth >= '2000-01-01';