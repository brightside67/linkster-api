const mongoose = require("mongoose");

/**
 * Mongo USER schema
 * */
const UserSchema = mongoose.Schema(
	{
		slug: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			minlength: 5,
			required: true,
		},
		email: {
			type: String,
			unique: true,
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
