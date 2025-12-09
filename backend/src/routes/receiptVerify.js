const express = require("express");
const router = express.Router();
const { verifyReceipt } = require("../controllers/receiptVerify");

// GET /api/receipts/:id/verify
router.get("/:id/verify", verifyReceipt);

module.exports = router;
