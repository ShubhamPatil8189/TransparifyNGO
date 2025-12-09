const express = require("express");
const { authMiddleware, adminOnly } = require("../middleware/user.middleware.js");
const { getMyProfile, updateMyProfile, listNGOUsers } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.get("/ngos/users", authMiddleware, adminOnly, listNGOUsers);

module.exports = router;
