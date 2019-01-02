const express = require("express");
const userAPI = require("../../controllers/api/user");

const router = express.Router();
/**
 * POST /api/user
 * CREATE NEW USER
 * */
router.post("/", userAPI.createNewUser);
/**
 * POST /api/user/login
 * TRY TO LOGIN WITH CREDENTIALS
 * */
router.post("/login", userAPI.loginUser);

module.exports = router;
