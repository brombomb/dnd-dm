CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    week_id INTEGER REFERENCES weeks(id) NOT NULL,
    dungeon_level INTEGER NOT NULL,
    room_number INTEGER NOT NULL,
    description TEXT,
    points INTEGER,
    item VARCHAR(255),
    monster VARCHAR(255)
);
