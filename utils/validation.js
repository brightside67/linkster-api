const jwt = require("jsonwebtoken");
const logger = require("mag")();

/**
 * Validate USER Middleware
 * @params {req, res, next}
 */
exports.validateUser = (req, res, next) => {
	jwt.verify(
		req.body.token,
		process.env.SECRET,
		(err, decoded) => {
			if (err)
				res.status(403).json({
					success: false,
					message: "You are not able to make this action.",
				});
			logger.warn(`403 validation user: ${decoded.email}`);
			next();
		}
	);
};
