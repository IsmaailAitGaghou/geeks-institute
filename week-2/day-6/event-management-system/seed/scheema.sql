DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS organizers;
DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS users;

-- Table for Organizers
CREATE TABLE organizers (
    organizer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255)
);

-- Table for Attendees
CREATE TABLE attendees (
    attendee_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50)
);

-- Table for Events
-- Stores details about each event.
-- It has a foreign key to the organizers table.
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    description TEXT,
    organizer_id INTEGER REFERENCES organizers(organizer_id) ON DELETE SET NULL
);

-- Junction Table: Tickets
-- Links Events and Attendees to represent ticket ownership.
CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    attendee_id INTEGER NOT NULL REFERENCES attendees(attendee_id) ON DELETE CASCADE,
    -- Ensure an attendee can only have one ticket per event
    UNIQUE (event_id, attendee_id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_keys (
    id SERIAL PRIMARY KEY,
    key_value TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for better performance on foreign keys
CREATE INDEX ON events (organizer_id);
CREATE INDEX ON tickets (event_id);
CREATE INDEX ON tickets (attendee_id);