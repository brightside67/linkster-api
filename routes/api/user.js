const express = require("express");
const userAPI = require("../../controllers/api/user");

const router = express.Router();
/**
 * POST /api/user
 * CREATE NEW USER
 * */
router.post("/", userAPI.createNewUser);

module.exports = router;
