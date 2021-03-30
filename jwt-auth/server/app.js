import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
// routes
import authRoutes from './routes/authRoutes.js';
import postsRoutes from './routes/postsRoutes.js';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
// CORS Middleware
app.use(cors());
// cookie middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// CSRF protection middleware
const csrfProtection = csrf({
	cookie: true,
});
app.use(csrfProtection);
// DB config
const dbURI = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

// database connection
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

// Use routes
app.get('/', (req, res) => res.send('home'));
app.get('/csrf-token', (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

export default app;
