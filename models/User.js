import mongoose from "mongoose";

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
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
