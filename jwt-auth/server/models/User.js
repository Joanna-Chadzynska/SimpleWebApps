import bcrypt from 'bcrypt';
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

// fire a function after doc saved to db
// UserSchema.post('save', function (doc, next) {
// 	console.log('New user was created & saved', doc);
// 	next();
// });

// fire a function before doc saved to db
UserSchema.pre('save', async function (next) {
	// console.log('User about to be created & saved', this);
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login user
UserSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	// check do we have a user
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		throw Error('Incorrect password');
	}

	throw Error('Incorrect email');
};

const User = mongoose.model('user', UserSchema);

export default User;
