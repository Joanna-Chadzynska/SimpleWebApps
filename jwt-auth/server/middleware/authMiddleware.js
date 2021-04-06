import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
	const token = req.cookies.access_token;

	// check jwt exists and verified
	if (!token) return res.sendStatus(401);
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
			if (err) return res.status(403);
			console.log(decodedToken);
			next();
		});
	}
};

// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.access_token;
	if (token) {
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET,
			async (err, decodedToken) => {
				if (err) {
					res.locals.user = null;
					next();
				}
				let user = await User.findByIt(decodedToken.id);
				res.locals.user = user;
				next();
			}
		);
	}
};

export default requireAuth;
