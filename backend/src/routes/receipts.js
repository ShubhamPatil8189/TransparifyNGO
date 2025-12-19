// routes/receipts.js
const express = require("express");
const router = express.Router();
const { getAllReceipts } = require("../controllers/receiptController");

router.get("/receipts/all", getAllReceipts);

module.exports = router;
