const express = require("express");
const linkAPI = require("../../controllers/api/link");
const {
	catchErrors,
} = require("../../handlers/errorHandler");

const router = express.Router();
/**
 * @POST /api/link
 * CREATE NEW LINK
 * */
router.post("/", catchErrors(linkAPI.createNewLink));

/**
 * @PUT /api/link
 * UPDATE LINK BY ID
 * */
router.put("/", catchErrors(linkAPI.updateLink));

/**
 * @DELETE /api/link
 * DELETE LINK BY ID
 * */
router.delete("/", catchErrors(linkAPI.deleteLink));

module.exports = router;
