// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const { listInventory,createInventoryItem } = require("../controllers/inventoryController");
// const { isAdmin } = require("../middlewares/authMiddleware");

// For file upload (optional)
// const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/",
  // upload.array("images"),   // only if using file upload
  createInventoryItem
);

// Anyone can list all items
router.get("/", listInventory);

module.exports = router;
