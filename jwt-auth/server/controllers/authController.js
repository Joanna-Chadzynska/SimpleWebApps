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

		console.log(user);
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

		res.status(201).json({
			user: user._id,
			accessToken,
		});
		res.status(200).json({ user: user._id });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).send(errors);
	}
};

export const logout_post = (req, res) => {
	res.send('User logout');
};

export const token_post = async (req, res) => {
	res.send('refresh token');
	try {
		const { refreshToken } = req.body;
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error!' });
	}
};

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

export const user_get = (req, res) => {
	res.send('get user details');
};
