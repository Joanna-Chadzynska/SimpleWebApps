import { Router } from 'express';
import { posts_get } from '../controllers/postsController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, posts_get);

export default router;
