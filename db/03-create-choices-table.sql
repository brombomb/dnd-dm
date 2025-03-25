CREATE TYPE choice_option AS ENUM ('Left', 'Straight', 'Right');

CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    week_id INTEGER REFERENCES weeks(id) NOT NULL,
    dungeon_level INTEGER NOT NULL,
    from_room_id INTEGER REFERENCES rooms(id) NOT NULL,
    choice_type choice_option NOT NULL,
    to_room_id INTEGER REFERENCES rooms(id) NOT NULL,
    choice_order INTEGER
);
