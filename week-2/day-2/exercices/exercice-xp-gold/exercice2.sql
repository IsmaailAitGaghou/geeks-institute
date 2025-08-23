-- Update

UPDATE students
SET date_birth = "1998-11-02"
WHERE first_name = "Marc"
    AND last_name = "Benichou"
    OR first_name = "Lea"
    AND last_name = "Benichou";

UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
    AND last_name = 'Grez';

-- Delete
DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- Count

SELECT COUNT(*) as total_student FROM students

SELECT COUNT(*) AS students_born_after_2000
FROM students
WHERE date_birth > '2000-01-01';

-- Insert / Alter

ALTER TABLE students
ADD COLUMN math_grade INT

UPDATE students
SET math_grade = 80
WHERE student_id = 1;

UPDATE students
SET math_grade = 90
WHERE student_id IN (2, 4);

UPDATE students
SET math_grade = 40
WHERE student_id = 6;

SELECT COUNT(*) AS high_performers
FROM students
WHERE math_grade > 83;

INSERT INTO students (student_id, first_name, last_name, date_birth, math_grade)
VALUES (8, 'Omer', 'Simpson', '1999-06-03', 70);

SELECT 
    first_name,
    last_name,
    COUNT(math_grade) AS total_grades
FROM students
GROUP BY first_name, last_name
ORDER BY total_grades DESC;

-- Sum
SELECT COUNT(math_grade) as total_math_grades FROM students