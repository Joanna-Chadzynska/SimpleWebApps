import { Router } from 'express';
import {
	login_post,
	logout_get,
	signup_post,
	token_post,
	user_get,
} from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.post('/token', token_post);
router.get('/user', user_get);

export default router;
