const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const errorHandlers = require("./handlers/errorHandler");

const app = express();
const PORT = process.env.PORT || 3002;

// database mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.DATABASE,
	{ useNewUrlParser: true }
);

// require MODELS
require("./models/User");
require("./models/Link");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

/**
 * Routes API
 * */
app.use("/api/user", require("./routes/api/user"));
app.use("/api/link", require("./routes/api/link"));

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

/**
 * Start express server
 */
app.listen(PORT);

module.exports = app;
