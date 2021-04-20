import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	// incorrect email
	if (err.message === 'Incorrect email') {
		errors.email = 'That email is not registered';
	}

	// incorrect password
	if (err.message === 'Incorrect password') {
		errors.password = 'That password is incorrect';
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.email = 'That email is already registered';
		return errors;
	}

	// validation errors
	if (err.message.includes('user validation failed')) {
		// console.log(err);
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(val);
			// console.log(properties);
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

const maxAge = 3 * 24 * 60 * 60;

// generate token
const generateAccessToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
		expiresIn: '3d',
	});
};

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

export const signup_post = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({
			email,
			password,
			name,
		});

		const accessToken = generateAccessToken({ id: user._id });

		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.JWT_REFRESH_TOKEN_SECRET
		);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			maxAge: 259200000,
		});

		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			maxAge: 267840000,
		});

		res.status(201).json({
			user: user._id,
			accessToken,
		});

		res.status(201).send({ user: user._id, accessToken, refreshToken });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).send(errors);
	}
};

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

export const login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const accessToken = generateAccessToken({ id: user._id });
		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.JWT_REFRESH_TOKEN_SECRET
		);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			maxAge: 259200000,
		});

		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			maxAge: 267840000,
		});

		res.status(201).send({ user: user._id, accessToken, refreshToken });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).send(errors);
	}
};

export const logout_get = (req, res) => {
	res.cookie('access_token', '', { maxAge: 1 });
	res.cookie('refresh_token', '', { maxAge: 1 });
	res.status(204).json('Logout successful');
};

export const refresh_token = async (req, res) => {
	// try {
	// 	if (!refreshToken) return res.sendStatus(401);
	// 	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
	// 		if (err) return res.sendStatus(403);
	// 		const accessToken = generateAccessToken({ id: user._id });
	// 		const refreshToken = jwt.sign(
	// 			{ id: user._id },
	// 			process.env.JWT_REFRESH_TOKEN_SECRET
	// 		);
	// 		res.cookie('access_token', accessToken, {
	// 			httpOnly: true,
	// 			maxAge: 259200000,
	// 		});
	// 		res.cookie('refresh_token', refreshToken, {
	// 			httpOnly: true,
	// 			maxAge: 267840000,
	// 		});
	// 		res.status(201).send({ user: user._id, accessToken, refreshToken });
	// 	});
	// } catch (error) {
	// 	const errors = handleErrors(error);
	// 	res.status(400).send(errors);
	// }
};

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

export const user_get = (req, res) => {
	res.send('get user details');
};

const getExpirationDate = (jwtToken) => {
	if (!jwtToken) return null;

	const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

	// multiply by 1000 to convert seconds into milliseconds
	return (jwt && jwt.exp && jwt.exp * 1000) || null;
};
