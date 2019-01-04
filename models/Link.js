const mongoose = require("mongoose");
/**
 * Mongo LINK schema
 * */
const LinkSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 300,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500,
		},
		cover: {
			type: String,
		},
		link: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		bookedBy: {
			type: [mongoose.Schema.ObjectId],
			ref: "User",
		},
		originalLink: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

// Define mongo indexes
LinkSchema.index({
	title: "text",
	description: "text",
	link: "text",
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;
