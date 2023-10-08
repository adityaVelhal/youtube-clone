import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please enter title.'],
        },
        descr: {
            type: String,
            required: [true, 'Please enter description.'],
        },
        imgUrl: {
            type: String,
            required: [true, 'Please enter description.'],
        },
        videoUrl: {
            type: String,
            required: [true, 'Please enter video URL.'],
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: {
            type: [String],
        },
        dislikes: {
            type: [String],
        },
    },
    { timestamps: true }
);

export default mongoose.model('Video', VideoSchema);
