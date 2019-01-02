const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// database mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.DATABASE,
	{ useNewUrlParser: true }
);
// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

/**
 * Start express server
 */
app.listen(PORT, () => {
	console.log(`The server is running on port ${PORT}`);
});

module.exports = app;
