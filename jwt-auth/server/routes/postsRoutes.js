import { Router } from 'express';
import { posts_get } from '../controllers/postsController.js';
const router = Router();

router.get('/api/posts', posts_get);
// app.get('/api/posts', authenticateToken, (req, res) => {
// 	res.send(posts);
// });
function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];

	const token = authHeader && authHeader.split(' ')[1];
	// const token = req.cookies.JWT;
	// console.log(token);
	if (token === null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

export default router;