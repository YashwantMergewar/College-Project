import dotenv from 'dotenv';
dotenv.config();
import { connectDB, disconnectDB } from './src/config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Database Connected Successfully");
    console.log(`Server running on port ${PORT}`);
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

