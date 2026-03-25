import dotenv from 'dotenv';
dotenv.config();
import { connectDB, disconnectDB } from './src/config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
    console.log("Database Connected Successfully");
    console.log(`Server running on http://0.0.0.0:${PORT} (reachable from LAN / hotspot)`);
    })
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    disconnectDB();
    process.exit(1);
})

process.on('unhandledRejection', async (err) => {
    console.error('Unhandled Rejection:', err);
    await disconnectDB();
    process.exit(1);
})

process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await disconnectDB();
    process.exit(1);
})

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await disconnectDB();
    process.exit(0);
})

