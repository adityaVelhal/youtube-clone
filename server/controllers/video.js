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
        }
        res.status(201).json(video);
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

            res.status(200).json(updateVideo);
        } else return createError(401, 'You cannot update this video');
    } catch (error) {
        return next(error);
    }
};

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return createError(404, 'Video Not Found');

        res.status(200).json(video);
    } catch (error) {
        return next(error);
    }
};
