import { Router } from 'express';
import {
    login_post,
    logout_post,
    signup_post,
    token_post,
    user_get
} from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.post('/logout', logout_post);
router.post('/token', token_post);
router.get('/user', user_get);

export default router;
