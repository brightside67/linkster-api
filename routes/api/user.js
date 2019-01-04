const express = require("express");
const userAPI = require("../../controllers/api/user");
const {
	catchErrors,
} = require("../../handlers/errorHandler");

const router = express.Router();
/**
 * @POST /api/user
 * CREATE NEW USER
 * */
router.post("/", catchErrors(userAPI.createNewUser));
/**
 * @POST /api/user/login
 * TRY TO LOGIN WITH CREDENTIALS
 * */
router.post("/login", catchErrors(userAPI.loginUser));

/**
 * @POST /api/user/logout
 * LOGOUT USER
 */
router.post("/logout", userAPI.userLogout);

/**
 * @PUT /api/user/
 * UPDATE USER
 */
router.put("/", userAPI.userUpdate);

module.exports = router;
