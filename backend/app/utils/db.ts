import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// ✅ Load .env from backend/
dotenv.config();

console.log('✅ DATABASE_URL value:', JSON.stringify(process.env.DATABASE_URL));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
