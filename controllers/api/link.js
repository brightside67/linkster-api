const mongoose = require("mongoose");
const logger = require("mag")();

const ObjectId = mongoose.Types.ObjectId;
const Link = mongoose.model("Link");

/**
 * @POST /api/link
 * Create new link on the database
 *
 * @method createNewLink
 * @params {req, res}
 *  */
exports.createNewLink = async (req, res) => {
	const linkItem = await new Link(req.body);

	if (!linkItem) {
		logger.info(`Cant create new Link`);
		res.status(400).json({
			success: false,
			message: "Cant create new Link",
		});
	}
	const savedLink = await linkItem.save();

	if (!savedLink) {
		logger.info(`Cant save link on the database`);

		res.status(400).json({
			success: false,
			message: "Cant save new Link on database",
		});
	}

	res.status(200).json({ success: true, link: savedLink });
};

/**
 * @PUT /api/link/update
 * UPDATE LINK BY LINK ID
 *
 * @method updateLink
 * @params {req, res}
 */
exports.updateLink = async (req, res) => {
	const link = await Link.findByIdAndUpdate(
		new ObjectId(req.body._id), // eslint-disable-line no-underscore-dangle
		req.body,
		{ new: true }
	);
	if (!link) {
		logger.info(
			`There is no Link with id: ${req.body._id}` // eslint-disable-line no-underscore-dangle
		);
		res.status(400).json({
			success: false,
			message: "There is no link with such id",
		});
	}

	res.status(200).json({ success: true, link });
};

exports.deleteLink = async (req, res) => {
	const link = await Link.findByIdAndDelete(
		new ObjectId(req.body._id) // eslint-disable-line no-underscore-dangle
	);
	if (!link) {
		res.status(400).json({
			success: false,
			message: "Cant delete this Link",
		});
	}
	res.status(200).json({
		success: true,
		message: "Link was deleted from database",
	});
};
