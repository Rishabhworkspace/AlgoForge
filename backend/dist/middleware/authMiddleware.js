"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await db_1.prisma.user.findUnique({
                where: { id: decoded.id },
            });
            if (!user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }
            // Exclude password
            const { password, ...userWithoutPassword } = user;
            req.user = userWithoutPassword;
            if (req.user?.isBanned) {
                res.status(403).json({ message: 'Your account has been suspended' });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Admin access required' });
    }
};
exports.adminOnly = adminOnly;
