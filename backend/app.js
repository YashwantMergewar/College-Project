import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApiError } from './utils/ApiError.js';
import userRoute from './src/routes/user.route.js';

const app = express();

if(process.env.NODE_ENV === "production"){
    app.set("trust proxy", 1);
}

app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({limit: "16kb"})) // Limit the request body size to 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})) // Limit the URL-encoded data size to 16kb
app.use(express.static("public")) // Serve static files from the "public" directory
app.use(cookieParser())


app.use("/api/v1/users", userRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    }
    
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app;