
const express = require("express");
const router = express.Router();

const { getPublicTransparency } = require("../controllers/publicTransparency");

router.get("/", getPublicTransparency);

module.exports = router;
