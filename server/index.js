import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.message || 'Something went wrong';

    return res.status(status).json({
        success: false,
        status,
        message: msg,
    });
});

const conn = () => {
    mongoose
        .connect(process.env.CONN_STRING)
        .then(() => {
            console.log('Connected to DB!');
            app.listen(8800, () => {
                console.log('Listening');
            });
        })
        .catch((err) => {
            throw err;
        });
};
conn();
