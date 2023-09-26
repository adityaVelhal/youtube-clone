import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (authHeader === undefined) {
        return next(createError(401, 'Unauthorized access!'));
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '')
        return next(createError(401, 'Unauthorized access!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, 'Token is not Valid!'));
        req.user = user;
        next();
    });
};
