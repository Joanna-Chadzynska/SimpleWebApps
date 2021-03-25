import dotenv from 'dotenv';

dotenv.config();

export default {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	MONGO_DB_NAME: process.env.MONGO_DB_NAME,
	JWT_SECRET: process.env.JWT_TOKEN_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
};
