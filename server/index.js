import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use('/api/users', userRoutes);

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
