-- 1)
SELECT * FROM language

-- 2)

SELECT f.title, f.description, l.name 
FROM film f
INNER JOIN language l ON f.language_id = l.language_id

-- 3)

SELECT f.title, f.description, l.name 
FROM film f
RIGHT JOIN language l ON l.language_id = f.language_id

-- 4)

CREATE TABLE new_film (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

INSERT INTO new_film (name)
VALUES
    ('Inception'),
    ('The Dark Knight'),
    ('Interstellar'),
    ('Parasite'),
    ('Spirited Away');

SELECT * from new_film

-- 5)

CREATE TABLE customer_review(
    review_id SERIAL PRIMARY KEY,
    film_id int NOT NULL,
    language_id int NOT NULL,
    title VARCHAR(200) NOT NULL,
    score smallint NOT NULL check(score between 1 and 10),
    review_text text,
    last_update TIMESTAMP DEFAULT NOW(),

    foreign key (film_id) references new_film(id) ON delete cascade,
    foreign key (language_id) references language(language_id)
)

-- 6)

INSERT INTO customer_review (film_id, language_id, title, score, review_text, last_update) VALUES 
(
    1, 1, 'Mind-Blowing Masterpiece', 8, 'Christopher Nolan has outdone himself. A complex, emotional, and visually stunning journey into dreams within dreams. I still think about it years later.',
    NOW()
),
(
    4, 1, 'A Thrilling social Commentary', 7, 'Parasite is a brilliant mix of dark comedy, suspense, and class critique. The way the story unfolds is unpredictable and deeply moving. A must-watch.',
    NOW()
)
-- 7)

delete from new_film WHERE id = 1
SELECT * from customer_review

-- Because we defined a (FOREIGN KEY (film_id) REFERENCES new_film(id) ON DELETE CASCADE) the review
-- for id 1 is automatically deleted from customer_review when the film is removed from new_film