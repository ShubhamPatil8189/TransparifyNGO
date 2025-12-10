const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const upload = require("../middleware/uploadInventory.js");

// POST with file upload
router.post(
  "/",
  upload.array("images", 10),   // handle up to 10 images
  inventoryController.createInventoryItem
);

// GET all items
router.get("/", inventoryController.listInventory);

module.exports = router;
