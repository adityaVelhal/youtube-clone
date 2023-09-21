import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) next(createError(401, 'Unauthorized access!'));
    const isCorrect = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) next(createError(403, 'Token is not Valid!'));
        req.user = user;
        next();
    });
};
