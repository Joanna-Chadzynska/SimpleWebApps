import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [8, 'Minimum password length is 8 characters'],
	},
	name: {
		type: String,
		required: true,
	},
	register_date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('user', UserSchema);

export default User;
