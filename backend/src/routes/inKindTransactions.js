const express = require("express");
const router = express.Router();
const { createInKindTransaction } = require("../controllers/inKindTransactions");

// POST /api/transactions/in-kind
router.post("/", createInKindTransaction);

module.exports = router;
