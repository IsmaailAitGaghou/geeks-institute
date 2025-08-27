-- Drop tables in reverse order to avoid foreign key constraints issues
DROP TABLE IF EXISTS album_artist;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS genre;

-- Create tables
CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    release_year INTEGER NOT NULL,
    genre_id INTEGER NOT NULL REFERENCES genre(id) ON DELETE RESTRICT
);

CREATE TABLE album_artist (
    album_id INTEGER NOT NULL REFERENCES album(id) ON DELETE CASCADE,
    artist_id INTEGER NOT NULL REFERENCES artist(id) ON DELETE RESTRICT, -- Use RESTRICT to prevent accidental artist deletion
    PRIMARY KEY (album_id, artist_id)
);

-- Seed data
-- Genres
INSERT INTO genre (name) VALUES
('Rock'), ('Pop'), ('Jazz'), ('Classical'), ('Hip Hop'), ('Electronic');

-- Artists
INSERT INTO artist (name) VALUES
('Queen'), ('Michael Jackson'), ('Miles Davis'), ('Ludwig van Beethoven'),
('Kendrick Lamar'), ('Daft Punk'), ('The Beatles'), ('Led Zeppelin'),
('Taylor Swift'), ('Bob Dylan');

-- Albums and Associations
-- Note: This is a simplified way to seed. A script would be more robust.
-- For simplicity, we assume IDs are sequential from 1.

-- A Night at the Opera (Queen, Rock)
INSERT INTO album (title, release_year, genre_id) VALUES ('A Night at the Opera', 1975, 1);
INSERT INTO album_artist (album_id, artist_id) VALUES (1, 1);

-- Thriller (Michael Jackson, Pop)
INSERT INTO album (title, release_year, genre_id) VALUES ('Thriller', 1982, 2);
INSERT INTO album_artist (album_id, artist_id) VALUES (2, 2);

-- Kind of Blue (Miles Davis, Jazz)
INSERT INTO album (title, release_year, genre_id) VALUES ('Kind of Blue', 1959, 3);
INSERT INTO album_artist (album_id, artist_id) VALUES (3, 3);

-- Symphony No. 5 (Beethoven, Classical)
INSERT INTO album (title, release_year, genre_id) VALUES ('Symphony No. 5', 1808, 4);
INSERT INTO album_artist (album_id, artist_id) VALUES (4, 4);

-- To Pimp a Butterfly (Kendrick Lamar, Hip Hop)
INSERT INTO album (title, release_year, genre_id) VALUES ('To Pimp a Butterfly', 2015, 5);
INSERT INTO album_artist (album_id, artist_id) VALUES (5, 5);

-- Random Access Memories (Daft Punk, Electronic)
INSERT INTO album (title, release_year, genre_id) VALUES ('Random Access Memories', 2013, 6);
INSERT INTO album_artist (album_id, artist_id) VALUES (6, 6);

-- Abbey Road (The Beatles, Rock)
INSERT INTO album (title, release_year, genre_id) VALUES ('Abbey Road', 1969, 1);
INSERT INTO album_artist (album_id, artist_id) VALUES (7, 7);

-- Led Zeppelin IV (Led Zeppelin, Rock)
INSERT INTO album (title, release_year, genre_id) VALUES ('Led Zeppelin IV', 1971, 1);
INSERT INTO album_artist (album_id, artist_id) VALUES (8, 8);

-- 1989 (Taylor Swift, Pop)
INSERT INTO album (title, release_year, genre_id) VALUES ('1989', 2014, 2);
INSERT INTO album_artist (album_id, artist_id) VALUES (9, 9);

-- Blonde on Blonde (Bob Dylan, Rock)
INSERT INTO album (title, release_year, genre_id) VALUES ('Blonde on Blonde', 1966, 1);
INSERT INTO album_artist (album_id, artist_id) VALUES (10, 10);

-- Discovery (Daft Punk, Electronic)
INSERT INTO album (title, release_year, genre_id) VALUES ('Discovery', 2001, 6);
INSERT INTO album_artist (album_id, artist_id) VALUES (11, 6);