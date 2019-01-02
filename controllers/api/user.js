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

/**
 * LOGIN User with credentials
 * */
exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email })
		.then(user => {
			if (user && user.isPasswordValid(password)) {
				const token = user.generateJWT();
				user.jwt = token; // eslint-disable-line no-param-reassign
				user.save().then(err => {
					if (!err)
						res.status(400).json({
							success: false,
							message:
								"Cant save jwt token to the database",
						});

					res.status(200).json({
						success: true,
						user,
					});
				});
			} else {
				res.status(301).json({
					success: false,
					message: "Wrong credentials",
				});
			}
		})
		.catch(err => {
			res.status(301).json({
				success: false,
				message: `There is an error: ${err}`,
			});
		});
};
