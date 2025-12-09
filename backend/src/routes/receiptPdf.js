const express = require("express");
const router = express.Router();
const { getReceiptPdf } = require("../controllers/receiptPdf");

// GET /api/receipts/:id/pdf
router.get("/:id/pdf", getReceiptPdf);

module.exports = router;
