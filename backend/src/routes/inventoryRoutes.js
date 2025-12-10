const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadInventory");
const inventoryHandler = require("../controllers/inventoryController");

// Use the single handler for both GET and POST
router.all("/", upload.array("images"), inventoryHandler);

module.exports = router;
