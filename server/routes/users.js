import express from 'express';
import {
    deleteUser,
    dislike,
    getUser,
    like,
    subscribe,
    unsubscribe,
    update,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, deleteUser);
router.get('/find/:id', getUser);
router.put('/sub/:id', verifyToken, subscribe);
router.put('/unsub/:id', verifyToken, unsubscribe);
router.put('/like/:id', verifyToken, like);
router.put('/dislike/:id', verifyToken, dislike);

export default router;
