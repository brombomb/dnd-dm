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

// Routes (we'll add these later)
// Example:
app.get('/api/dungeons', async (req: Request, res: Response) => {
    try {
        const allDungeons = await pool.query("SELECT * FROM dungeons");
        res.json(allDungeons.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
