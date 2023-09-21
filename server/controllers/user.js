import { createError } from '../middleware/error.js';
import User from '../models/Users.js';

export const update = async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                $set: req.body,
            });
            res.status(200).json(updatedUser);
        } else next(createError(403, 'Unauthorized!'));
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
