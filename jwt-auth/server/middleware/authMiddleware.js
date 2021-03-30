import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
	const token = req.cookies.access_token;

	// check jwt exists and verified
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				// redirect to login page
				console.log(err.message);
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		// res.redirect(); redirect to login page
	}
};

export default requireAuth;
