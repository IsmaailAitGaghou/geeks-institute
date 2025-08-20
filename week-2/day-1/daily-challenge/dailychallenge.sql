-- Count how many actors are in the table
SELECT COUNT(*)
FROM actors -- Try to add a new actor with some blank fields. What do you think the outcome will be ?
INSERT INTO actors (
        actor_id,
        first_name,
        last_name,
        age,
        number_oscars
    )
VALUES ('', '', '2000-01-01');
-- The outcome will be an error because all fields are NOT NULL.