import mongoose from 'mongoose';
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import { createError } from '../middleware/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        let hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new Users({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send('User has been created!');
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            next(createError(400, 'Incorrect credentials.1'));
        }

        const isCorrect = bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) next(createError(400, 'Incorrect credentials'));

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...user._doc, password: null });
    } catch (err) {
        next(err);
    }
};
