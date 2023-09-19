import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter user name.'],
        },
        email: {
            type: String,
            required: [true, 'Please enter email.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter password.'],
        },
        img: {
            type: String,
        },
        Subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
