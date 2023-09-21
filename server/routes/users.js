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
router.delete('/:id', deleteUser);
router.get('/find/:id', getUser);
router.put('/sub/:id', subscribe);
router.put('/unsub/:id', unsubscribe);
router.put('/:id', like);
router.put('/:id', dislike);

export default router;
