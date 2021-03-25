import User from '../models/User.js';

// handle errors
const handleErrors = (err) => {
	// console.log(err.message, err.code);
	let errors = { email: '', password: '' };
	// validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
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
		res.status(201).json(user);
		res.send('signup new user');
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).json(errors);
	}
};

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

export const login_post = async (req, res) => {
	const { email, password } = req.body;
	res.send('User login');
};

export const logout_post = (req, res) => {
	res.send('User logout');
};

export const token_post = (req, res) => {
	res.send('refresh token');
};

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

export const user_get = (req, res) => {
	res.send('get user details');
};
