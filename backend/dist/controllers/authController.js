"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.googleAuth = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please add all fields' });
        return;
    }
    const userExists = await db_1.prisma.user.findUnique({ where: { email } });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const user = await db_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            xp_points: user.xp_points,
            streak_days: user.streak_days,
            solvedProblems: user.solvedProblems,
            bookmarks: user.bookmarks,
            activityLog: user.activityLog
        });
    }
    else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};
exports.registerUser = registerUser;
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await db_1.prisma.user.findUnique({ where: { email } });
    if (user && user.password && (await bcryptjs_1.default.compare(password, user.password))) {
        if (user.isBanned) {
            res.status(403).json({ message: 'Your account has been suspended' });
            return;
        }
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            xp_points: user.xp_points,
            streak_days: user.streak_days,
            solvedProblems: user.solvedProblems,
            bookmarks: user.bookmarks,
            activityLog: user.activityLog
        });
    }
    else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};
exports.loginUser = loginUser;
// @desc    Google Auth
// @route   POST /api/users/google
// @access  Public
const googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            res.status(400).json({ message: 'Invalid Google Token' });
            return;
        }
        const { email, name, sub: googleId, picture: avatar } = payload;
        let user = await db_1.prisma.user.findUnique({ where: { email } });
        let isNewUser = false;
        if (user) {
            if (!user.googleId) {
                user = await db_1.prisma.user.update({
                    where: { id: user.id },
                    data: { googleId }
                });
            }
        }
        else {
            isNewUser = true;
            user = await db_1.prisma.user.create({
                data: {
                    name: name || 'Google User',
                    email,
                    googleId,
                    avatar,
                    password: ''
                }
            });
        }
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            xp_points: user.xp_points,
            streak_days: user.streak_days,
            solvedProblems: user.solvedProblems,
            bookmarks: user.bookmarks,
            activityLog: user.activityLog,
            isNewUser
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Google Auth Failed' });
    }
};
exports.googleAuth = googleAuth;
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
exports.getMe = getMe;
