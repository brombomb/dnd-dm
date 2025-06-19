import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db/db'; // Import the database connection
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Get all dungeons
app.get('/api/dungeons', async (req: Request, res: Response) => {
    try {
        const allDungeons = await pool.query("SELECT * FROM weeks");
        res.json(allDungeons.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Create a new dungeon
app.post('/api/dungeons', async (req: Request, res: Response) => {
    try {
        const { weekNumber, level } = req.body;

        // Calculate start date using the week number
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        // Insert week if it doesn't exist
        const weekResult = await pool.query(
            "INSERT INTO weeks(week_number, year, start_date) VALUES($1, $2, $3) ON CONFLICT (week_number, year) DO UPDATE SET start_date = $3 RETURNING *",
            [weekNumber, currentYear, currentDate]
        );

        const weekId = weekResult.rows[0].id;

        res.json({
            id: weekId,
            weekNumber,
            level,
            startDate: currentDate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Create a new room
app.post('/api/rooms', async (req: Request, res: Response) => {
    try {
        const { weekId, dungeonLevel, roomNumber, description, points, items, monsters } = req.body;

        const newRoom = await pool.query(
            "INSERT INTO rooms(week_id, dungeon_level, room_number, description, points, item, monster) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [weekId, dungeonLevel, roomNumber, description, points || 0, items || null, monsters || null]
        );

        res.json(newRoom.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Get rooms for a specific dungeon
app.get('/api/dungeons/:weekId/rooms', async (req: Request, res: Response) => {
    try {
        const { weekId } = req.params;
        const { level } = req.query;

        const rooms = await pool.query(
            "SELECT * FROM rooms WHERE week_id = $1 AND dungeon_level = $2 ORDER BY room_number",
            [weekId, level]
        );

        res.json(rooms.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Create a new connection between rooms
app.post('/api/connections', async (req: Request, res: Response) => {
    try {
        const { weekId, dungeonLevel, fromRoomId, choiceType, toRoomId } = req.body;

        const newConnection = await pool.query(
            "INSERT INTO choices(week_id, dungeon_level, from_room_id, choice_type, to_room_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [weekId, dungeonLevel, fromRoomId, choiceType, toRoomId]
        );

        res.json(newConnection.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Get connections for a specific dungeon
app.get('/api/dungeons/:weekId/connections', async (req: Request, res: Response) => {
    try {
        const { weekId } = req.params;
        const { level } = req.query;

        const connections = await pool.query(
            "SELECT * FROM choices WHERE week_id = $1 AND dungeon_level = $2",
            [weekId, level]
        );

        res.json(connections.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
