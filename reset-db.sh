#!/bin/bash
# Reset the database containers with new credentials

echo "Stopping containers..."
docker-compose down

echo "Removing database volumes..."
docker volume rm dnd-dm_db_data dnd-dm_pgadmin_data

echo "Starting containers with new credentials..."
docker-compose up -d

echo "Waiting for database to start..."
sleep 5

echo "Database reset complete!"
