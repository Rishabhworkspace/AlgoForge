import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { config } from '../config/env';

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, config.JWT_SECRET!) as JwtPayload;

            const user = await prisma.user.findUnique({
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
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

export { protect, adminOnly };
