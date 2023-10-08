import { createError } from '../middleware/error.js';
import Video from '../models/Video.js';

export const addVideo = async (req, res, next) => {
    try {
        const video = new Video({ ...req.body, userId: req.user.id });
        await video.save();

        res.status(201).json(video);
    } catch (error) {
        return next(error);
    }
};

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) return next(createError(404, 'Video does not exist'));

        if (video.userId === req.user.id) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json('Video Deleted successfully');
        }
    } catch (error) {
        return next(error);
    }
};

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) return next(createError(404, 'Video does not exist'));

        if (video.userId === req.user.id) {
            const updatedVdo = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json(updatedVdo);
        } else return next(createError(401, 'You cannot update this video'));
    } catch (error) {
        return next(error);
    }
};

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        console.log(video);
        if (!video) return next(createError(401, 'Video not found'));

        res.status(200).json(video);
    } catch (error) {
        return next(error);
    }
};
