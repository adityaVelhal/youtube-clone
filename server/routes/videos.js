import express from 'express';
import {
    addVideo,
    addView,
    deleteVideo,
    getVideo,
    random,
    subscribed,
    trends,
    updateVideo,
} from '../controllers/video.js';
import { verifyToken } from './../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.get('/view/:id', addView);
router.get('/trend', trends);
router.get('/random', random);
router.get('/subscribed', subscribed);

export default router;
