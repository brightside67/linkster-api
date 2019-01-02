const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const logger = require("mag")();

const User = mongoose.model("User");

/**
 * Create and save new USER model to the database
 * @params {req, res}
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
			logger.info(
				`Cant save user ${req.body.email} in the database`
			);
			res.status(200).json({ success: true, user });
			logger.info(
				`New user ${req.body.email} saved in database`
			);
		})
		.catch(err => {
			res.status(301).json({
				success: false,
				message: `Cant save new user in the database: ${err}`,
			});
			logger.debug(
				`Cant save user, reason: ${err.message}`
			);
		});
};

/**
 * LOGIN User with credentials
 * @params {req, res}
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
					logger.info(`User ${user.email} logged in`);
				});
			} else {
				res.status(301).json({
					success: false,
					message: "Wrong credentials",
				});
				logger.info(`User ${user.email} cant login`);
			}
		})
		.catch(err => {
			res.status(301).json({
				success: false,
				message: `There is an error: ${err}`,
			});
		});
};

/**
 * POST /api/user/logout
 * @params {req, res}
 * decode JWT token from POST
 * find USER and delete jwt
 */
exports.userLogout = (req, res) => {
	jwt.verify(
		req.body.token,
		process.env.SECRET,
		(err, decoded) => {
			if (err)
				res.status(400).json({
					success: false,
					message: "Cant login, invalid session token",
				});
			User.findOne({ email: decoded.email }).then(user => {
				if (!user)
					res.status(400).json({
						success: false,
						message: "There is no active session",
					});
				user.jwt = ""; // eslint-disable-line no-param-reassign
				user.save().then(error => {
					if (!error)
						res.status(400).json({
							success: false,
							message: `There is no active session:${error}`,
						});
					res
						.status(200)
						.json({ success: true, message: "Logout" });
				});
			});
		}
	);
};
