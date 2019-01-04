const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const logger = require("mag")();

const User = mongoose.model("User");

/**
 * @POST
 * Create and save new USER model to the database
 *
 * @method createNewUser
 * @params {req, res}
 * */
exports.createNewUser = async (req, res) => {
	const userItem = await new User(req.body);
	userItem.setPassword(req.body.password);

	const savedUser = await userItem.save();
	if (!savedUser) {
		res.status(301).json({
			success: false,
			message: "Cant save new user in the database",
		});
		logger.info(
			`Cant save user ${req.body.email} in the database`
		);
	}

	res.status(200).json({ success: true, user: savedUser });
	logger.info(
		`New user ${req.body.email} saved in database`
	);
};

/**
 * @POST
 * LOGIN User with credentials
 *
 * @method loginUser
 * @params {req, res}
 * */
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	const userItem = await User.findOne({ email });
	if (!userItem)
		res.status(301).json({
			success: false,
			message: "No such email in database",
		});
	logger.info(`User ${userItem.email} cant login`);
	if (userItem && !userItem.isPasswordValid(password))
		res.status(403).json({
			success: false,
			message: "Wrong password",
		});

	if (userItem && userItem.isPasswordValid(password)) {
		const token = userItem.generateJWT();
		userItem.jwt = token;

		const savedUser = await userItem.save();
		if (!savedUser)
			res.status(400).json({
				success: false,
				message: "Cant save jwt token to the database",
			});
		res.status(200).json({
			success: true,
			user: savedUser,
		});
		logger.info(`User ${savedUser.email} logged in`);
	}
};

/**
 * @POST /api/user/logout
 * decode JWT token from POST
 * find USER and delete jwt
 *
 * @method userLogout
 * @params {req, res}
 */
exports.userLogout = (req, res) => {
	jwt.verify(
		req.body.token,
		process.env.SECRET,
		async (err, decoded) => {
			try {
				if (err)
					res.status(400).json({
						success: false,
						message: "Cant logout, invalid session token",
					});

				const userItem = await User.findOne({
					email: decoded.email,
				});
				if (!userItem)
					res.status(400).json({
						success: false,
						message: "There is no active session",
					});
				userItem.jwt = "";

				const savedUser = await userItem.save();
				if (!savedUser)
					res.status(400).json({
						success: false,
						message: `There is no active session`,
					});

				return res
					.status(200)
					.json({ success: true, message: "Logout" });
			} catch (error) {
				return res
					.status(500)
					.json({ success: false, message: error.message });
			}
		}
	);
};
