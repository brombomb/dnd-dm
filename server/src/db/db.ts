import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file - use absolute path to be sure it loads
dotenv.config();

// Set fixed credentials for now
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'dnd_dm',
  password: 'postgres',
  port: 5432
};

// Log DB connection details (but hide full password)
console.log('Database connection details:');
console.log(`User: ${dbConfig.user}`);
console.log(`Host: ${dbConfig.host}`);
console.log(`Database: ${dbConfig.database}`);
console.log(`Password: ******`);
console.log(`Port: ${dbConfig.port}`);

const pool = new Pool(dbConfig);

export default pool;
