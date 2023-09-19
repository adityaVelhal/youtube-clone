import mongoose from 'mongoose';
import Users from '../models/Users.js';

export const signup = async (req, res) => {
    try {
        const newUser = new Users(req.body);
    } catch (err) {
        throw err;
    }
};
