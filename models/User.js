const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Mongo USER schema
 * */
const UserSchema = mongoose.Schema(
	{
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
			trim: true,
		},
		passwordHash: {
			type: String,
			minlength: 5,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			index: true,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			minlength: 4,
		},
		description: {
			type: String,
			maxlength: 180,
			trim: true,
		},
		category: {
			type: [String],
			default: ["Uncategorized"],
		},
		jwt: {
			type: String,
			default: "",
		},
		emailConfirmed: {
			type: Boolean,
			default: false,
		},
		userRole: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

/**
 * Generate hash password from
 * given password from POST /api/user
 *
 * @method setPassword
 * @param {password}
 * */
UserSchema.methods.setPassword = function setPassword(
	password
) {
	this.passwordHash = bcrypt.hashSync(password, 10);
};

/**
 * Check if password from POST /api/user/login
 * credentials is valid
 *
 * @method isPasswordValid
 * @param {password} String
 * @return {Boolean}
 * */
UserSchema.methods.isPasswordValid = function isPasswordValid(
	password
) {
	return bcrypt.compareSync(password, this.passwordHash);
};

/**
 * Generate JWT token
 *
 * @method generateJWT
 * @return {jwt.sign Object}
 * */
UserSchema.methods.generateJWT = function generateJWT() {
	return jwt.sign(
		{
			email: this.email,
			username: this.username,
		},
		process.env.SECRET
	);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
