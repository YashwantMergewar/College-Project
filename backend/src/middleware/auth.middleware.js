import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const generateAccessToken = (user) => {
    const payload = { id: user.id, role: user.role };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" });
};

export const generateRefreshToken = (user) => {
    const payload = { id: user.id };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" });
};

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded?.id } });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        // remove sensitive fields before attaching
        const { password, ...safeUser } = user;
        req.user = safeUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid access token" });
    }
};