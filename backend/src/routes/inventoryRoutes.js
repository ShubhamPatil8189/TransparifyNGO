const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadInventory");
const { createInventoryItem, listInventory } = require("../controllers/inventoryController");

router.post("/", upload.array("images"), createInventoryItem);
router.get("/", listInventory);

module.exports = router;
