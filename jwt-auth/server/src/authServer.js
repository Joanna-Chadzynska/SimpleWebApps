require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

const users = [];

let refreshTokens = [];

app.get('/api/users', (req, res) => {
	res.json(users);
});

app.post('/api/users', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = {
			name: req.body.name,
			password: hashedPassword,
		};
		users.push(user);
		res.status(201).send();
	} catch {
		res.status(500).send();
	}
});

app.post('/api/auth/login', async (req, res) => {
	// // res.cookie('JWT', accessToken, {
	// // 	maxAge: 86400000,
	// // 	httpOnly: true,
	// // });

	// // res.cookie('refresh', refreshToken, {
	// // 	maxAge: 86400000,
	// // 	httpOnly: true,
	// // });
	const user = users.find((user) => user.name === req.body.name);

	if (user === null) {
		return res.status(400).send('Cannot find user');
	}

	try {
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (validPassword) {
			const accessToken = generateAccessToken(user);
			const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
			refreshTokens.push(refreshToken);
			res.json({ accessToken, refreshToken });
		}
	} catch {
		res.status(500).send();
	}
});

app.post('/api/auth/refresh', (req, res) => {
	// // TODO: Check if refresh token exists in DB

	const refreshToken = req.body.token;

	if (refreshToken === null) return res.sendStatus(401);

	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
});

app.delete('/api/auth/logout', (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

function generateAccessToken(payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 84600 });
}

app.listen(4000, () => {
	console.log('Auth Server is up');
});
