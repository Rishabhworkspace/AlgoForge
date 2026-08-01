"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const env_1 = require("./config/env");
const app = (0, express_1.default)();
exports.app = app;
const port = env_1.config.PORT || 5000;
// Middleware
const allowedOrigins = [
    'https://algo-forge-2-0.vercel.app',
    'https://algoforge-2-0.onrender.com',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000',
    env_1.config.CLIENT_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // allow server-to-server (no origin) or listed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Remove Express fingerprint header
app.disable('x-powered-by');
// Security headers config
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'none'"],
            connectSrc: ["'self'"],
            imgSrc: ["'self'"],
            styleSrc: ["'none'"],
            frameAncestors: ["'none'"],
            formAction: ["'none'"],
        }
    },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    noSniff: true,
    frameguard: { action: 'deny' },
    hsts: process.env.NODE_ENV === 'production' ? {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    } : false,
    xssFilter: true,
}));
// Permissions-Policy header configuration
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
    next();
});
app.use(express_1.default.json());
// Database Connection
(0, db_1.default)();
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use('/api/users', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
const infoRoutes_1 = __importDefault(require("./routes/infoRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const userActionRoutes_1 = __importDefault(require("./routes/userActionRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const forumRoutes_1 = __importDefault(require("./routes/forumRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
app.use('/api/info', infoRoutes_1.default);
app.use('/api/content', contentRoutes_1.default);
app.use('/api/user-actions', userActionRoutes_1.default);
app.use('/api/chat', chatRoutes_1.default);
app.use('/api/forum', forumRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.get('/', (req, res) => {
    res.send('AlgoForge API is running');
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});
let server;
if (process.env.NODE_ENV !== 'test') {
    exports.server = server = app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
