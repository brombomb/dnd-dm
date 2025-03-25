-- Create the user (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'dnd_dm_user') THEN
    CREATE USER dnd_dm_user WITH PASSWORD 'dungeon_master';
  END IF;
END
$$;

-- Create the database (only if it doesn't exist)
CREATE DATABASE dnd_dm
WITH
    OWNER = dnd_dm_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Grant privileges (if the user and database were just created)
GRANT ALL PRIVILEGES ON DATABASE dnd_dm TO dnd_dm_user;
