const mongoose = require("mongoose");

const User = mongoose.model("User");

/**
 * Create and save new USER model to the database
 * */
exports.createNewUser = (req, res) => {
	const userItem = new User(req.body);
	userItem.setPassword(req.body.password);
	userItem
		.save()
		.then(user => {
			if (!user)
				res.status(301).json({
					success: false,
					message: "Cant save new user in the database",
				});
			res.status(200).json({ success: true, user });
		})
		.catch(err => {
			res.status(301).json({
				success: false,
				message: `Cant save new user in the database: ${err}`,
			});
		});
};
