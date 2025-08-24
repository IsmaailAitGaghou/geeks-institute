-- Part 1
CREATE TABLE customer (
    customer_id serial primary key,
    first_name varchar(150),
    last_name varchar(150) not null
)

CREATE TABLE customer_profile (
    customer_profile_id serial primary key,
    is_logged_in boolean DEFAULT FALSE,
    customer_id int UNIQUE,
    foreign key (customer_id) references customer(customer_id) 
    on delete cascade
    on update cascade
)


INSERT into customer (first_name, last_name) VALUES ('John', 'Doe'), ('Jerome', 'Lalu'), ('Lea', 'Rive')

INSERT into customer_profile(is_logged_in, customer_id) VALUES 
(TRUE, (SELECT customer_id from customer WHERE first_name = 'John' and last_name = 'Doe'))

INSERT into customer_profile(is_logged_in, customer_id) VALUES
(FALSE, (SELECT customer_id from customer WHERE first_name = 'Jerome' and last_name = 'Lalu'))


SELECT c.first_name 
from customer c 
inner join customer_profile cp on c.customer_id = cp.customer_id
WHERE is_logged_in = TRUE

SELECT c.first_name, cp.is_logged_in
from customer c
left JOIN customer_profile cp on c.customer_id = cp.customer_id

SELECT count(*) as not_logged_in_count
from customer c
left join customer_profile cp on c.customer_id = cp.customer_id
WHERE cp.is_logged_in = FALSE or cp.is_logged_in IS NULL

-- part 2

CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title varchar(150) NOT NULL,
    author varchar(150) NOT NULL
)

INSERT into book (title, author)
VALUES ('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee')

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name varchar(200) NOT NULL UNIQUE,
    age int check (age <= 15)
)

INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE library (
    book_fk_id INT,
    student_fk_id INT,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id), 
    FOREIGN KEY (book_fk_id) REFERENCES book(book_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES student(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id from book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id from student WHERE name = 'John'), '2022-02-15'),
        (
        (SELECT book_id from book WHERE title = 'To kill a mockingbird'),
        (SELECT student_id from student WHERE name = 'Bob'), '2021-03-03'),
        (
        (SELECT book_id from book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id from student WHERE name = 'Lera'), '2021-05-23'),
        (
        (SELECT book_id from book WHERE title = 'Harry Potter'),
        (SELECT student_id from student WHERE name = 'Bob'), '2021-08-12')
        

SELECT * FROM library

SELECT s.name, b.title
FROM library l
inner join student s on l.student_fk_id = s.student_id
inner join book b on l.book_fk_id = b.book_id

SELECT 
avg(s.age) as average_age
from library l
join student s on l.student_fk_id = s.student_id
join book b on l.book_fk_id = b.book_id
WHERE b.title like "Alice In Wonderland"

SELECT * from library
DELETE FROM student WHERE name = 'Bob';
-- Bob’s two borrowed records are gone Because library.student_fk_id has ON DELETE CASCADE
