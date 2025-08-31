
INSERT INTO organizers (name, contact_info) VALUES
('TechConferences Inc.', 'contact@techconferences.com'),
('MusicFest Group', 'info@musicfest.com'),
('ArtExhibitions LLC', 'support@artexhibitions.com'),
('FoodieFestivals', 'hello@foodiefestivals.com'),
('SportsEvents Management', 'events@sportsevents.com'),
('Wellness Retreats', 'booking@wellnessretreats.com'),
('Literary Circle', 'authors@literarycircle.com'),
('Community Builders', 'community@builders.org'),
('StartupGrind Local', 'local@startupgrind.com'),
('FashionWeek Organizers', 'press@fashionweek.com');


INSERT INTO attendees (name, email, phone) VALUES
('Alice Johnson', 'alice.j@email.com', '123-456-7890'),
('Bob Smith', 'bob.s@email.com', '234-567-8901'),
('Charlie Brown', 'charlie.b@email.com', '345-678-9012'),
('Diana Prince', 'diana.p@email.com', '456-789-0123'),
('Ethan Hunt', 'ethan.h@email.com', '567-890-1234'),
('Fiona Glenanne', 'fiona.g@email.com', '678-901-2345'),
('George Costanza', 'george.c@email.com', '789-012-3456'),
('Hannah Montana', 'hannah.m@email.com', '890-123-4567'),
('Ian Malcolm', 'ian.m@email.com', '901-234-5678'),
('Jane Doe', 'jane.d@email.com', '012-345-6789'),
('Clark Kent', 'clark.k@email.com', '111-222-3333'),
('Bruce Wayne', 'bruce.w@email.com', '222-333-4444'),
('Peter Parker', 'peter.p@email.com', '333-444-5555'),
('Tony Stark', 'tony.s@email.com', '444-555-6666'),
('Steve Rogers', 'steve.r@email.com', '555-666-7777');


INSERT INTO events (name, date, location, description, organizer_id) VALUES
('Annual Tech Summit 2025', '2025-09-15 09:00:00', 'Convention Center Hall A', 'The biggest tech summit of the year.', 1),
('Summer Music Festival', '2025-07-20 12:00:00', 'Green Park', 'A weekend of live music from top artists.', 2),
('Modern Art Showcase', '2025-10-05 10:00:00', 'City Art Gallery', 'Exhibition of contemporary art.', 3),
('International Food Fair', '2025-08-30 11:00:00', 'Downtown Plaza', 'Taste food from around the world.', 4),
('Marathon Championship', '2025-09-07 07:00:00', 'City Streets', 'Annual city marathon.', 5),
('Yoga and Meditation Retreat', '2025-11-10 08:00:00', 'Mountain Resort', 'A retreat for wellness and peace.', 6),
('Poetry Slam Night', '2025-08-22 19:00:00', 'The Cozy Cafe', 'An evening of spoken word and poetry.', 7),
('Neighborhood Cleanup Drive', '2025-09-28 09:00:00', 'Community Hall', 'Join us to make our neighborhood cleaner.', 8),
('Fireside Chat with Entrepreneurs', '2025-10-15 18:00:00', 'Innovation Hub', 'Networking event for startups.', 9),
('Fall Fashion Show', '2025-11-01 20:00:00', 'Grand Ballroom', 'Showcasing the latest fall collections.', 10);


INSERT INTO tickets (event_id, attendee_id) VALUES
(1, 1), (1, 9), (1, 14), (1, 15),
(2, 2), (2, 8), (2, 11),
(3, 3), (3, 10),
(4, 4), (4, 7),
(5, 5), (5, 12),
(6, 6), (6, 1),
(7, 7), (7, 3),
(8, 8), (8, 13),
(9, 9), (9, 14),
(10, 10), (10, 4);

INSERT INTO users (username, email, password_hash) VALUES
('admin', 'admin@example.com', '$pbkdf2-sha256$600000$gH2Xxq2gqOk9vL3n1m6F3Q$Go8Hc9gH6qZP1Yw7x5oFDv2wMZQx9h5m3p5cYQzRkqY'), -- placeholder, will be overwritten on first run
('user', 'user@example.com', '$pbkdf2-sha256$600000$gH2Xxq2gqOk9vL3n1m6F3Q$Go8Hc9gH6qZP1Yw7x5oFDv2wMZQx9h5m3p5cYQzRkqY');


INSERT INTO api_keys (key_value) VALUES ('123456');  

SELECT * FROM organizers;
SELECT * FROM attendees;
SELECT * FROM events;
SELECT * FROM tickets;
SELECT * FROM users;
