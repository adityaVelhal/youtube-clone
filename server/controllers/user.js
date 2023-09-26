import { createError } from '../middleware/error.js';
import User from '../models/Users.js';

export const update = async (req, res, next) => {
    try {
        if (req.params.id === req.user.id) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({ ...updatedUser._doc, password: null });
        } else next(createError(403, 'Unauthorized!'));
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (req.params.id === req.user.id) {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json('User has been deleted!');
        } else next(createError(403, 'Unauthorized!'));
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(200).json('User not found!');
        res.status(200).json({ ...user._doc, password: null });
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        let subscriber = await User.findById(req.user.id);

        if (!subscriber._doc.subscribedUsers.includes(req.params.id)) {
            subscriber._doc.subscribedUsers.push(req.params.id);
            await subscriber.save();

            await User.updateOne(
                { _id: req.params.id },
                {
                    $inc: { subscribers: 1 },
                }
            );

            res.status(200).json('User subscribed successfully.');
        } else res.status(200).json('User already subscribed');
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.updateOne(
            { _id: req.user.id },
            {
                $pull: { subscribedUsers: req.params.id },
            }
        );

        await User.updateOne(
            { _id: req.params.id },
            {
                $inc: { subscribers: -1 },
            }
        );

        res.status(200).json('User Unsubscribed successfully.');
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
