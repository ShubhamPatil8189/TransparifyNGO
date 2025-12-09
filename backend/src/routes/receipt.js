const express = require("express");
const router = express.Router();
const { getTransactionReceipt } = require("../controllers/receipt");

// GET /api/transactions/:id/receipt
router.get("/:id/receipt", getTransactionReceipt);

module.exports = router;
