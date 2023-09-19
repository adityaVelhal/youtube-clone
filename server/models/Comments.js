import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        descr: {
            type: String,
            required: [true, 'Please enter description.'],
        },
    },
    { timestamps: true }
);

export default mongoose.Model('Comment', CommentSchema);
