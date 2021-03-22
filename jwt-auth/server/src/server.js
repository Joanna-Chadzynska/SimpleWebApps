require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const posts = [
	{
		username: 'Kyle',
		title: 'Post 1',
	},
	{
		username: 'Jim',
		title: 'Post 2',
	},
];

app.get('/api/posts', authenticateToken, (req, res) => {
	res.send(posts);
});

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

app.listen(3000, () => {
	console.log('Server is up');
});
