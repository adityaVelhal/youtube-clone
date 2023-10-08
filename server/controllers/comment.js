import { createError } from '../middleware/error.js';
import Comments from '../models/Comments.js';
import Video from '../models/Video.js';

export const comment = async (req, res, next) => {
    try {
        const vdo = await Video.findById(req.params.id);
        if (!vdo) return next(createError(404, 'Video not found'));

        const cmt = new Comments({
            ...req.body,
            userId: req.user.id,
            videoId: vdo._doc._id,
        });

        await cmt.save();
        res.status(201).json('Comment added.');
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        let comment = await Comments.findById(req.params.id);
        if (!comment) return next(createError(404, 'comment not found'));

        if (comment._doc.userId === req.user.id) {
            comment = await Comments.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(comment);
        } else return next(createError(401, 'Not allowed to edit the comment'));
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        let comment = await Comments.findById(req.params.id);
        if (!comment) return next(createError(404, 'comment not found'));

        if (comment._doc.userId === req.user.id) {
            comment = await Comments.findByIdAndDelete(req.params.id);
            res.status(200).json('Comment Deleted');
        } else
            return next(createError(401, 'Not allowed to delete the comment'));
    } catch (error) {
        next(error);
    }
};

export const getVideoComments = async (req, res, next) => {
    try {
        const comments = await Comments.find({ videoId: req.body.videoId });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
