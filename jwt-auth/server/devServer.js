import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import dotenv from 'dotenv';
import express from 'express';
import postsRoutes from './routes/postsRoutes.js';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
// CORS Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// cookie middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// CSRF protection middleware
const csrfProtection = csrf({
	cookie: true,
});
app.use(csrfProtection);

app.use('/api/posts', postsRoutes);

app.listen(4001, () => console.log(`Server started on PORT 4001`));
