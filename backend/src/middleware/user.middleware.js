import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

        const decoded = jwt.verify(token, process.env.JWTSecret);
        const user = await User.findById(decoded.key).select("-password -code -codeExpiry");

        if (!user) return res.status(401).json({ message: "Invalid Token" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


export const adminOnly = (req, res, next) => {
    if (!req.user.roles.includes("NGO_ADMIN")) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
};
