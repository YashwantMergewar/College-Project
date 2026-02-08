import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './src/config/db.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

const PORT = process.env.PORT || 5000;

// pool.connect()

app.get("/health", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({ dbTime: result.rows[0] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})