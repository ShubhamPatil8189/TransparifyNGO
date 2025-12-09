const express = require("express");
const router = express.Router();
const { getAllTransactions } = require("../controllers/allTransactions");

// GET all transactions (financial + in-kind)
router.get("/", getAllTransactions);

module.exports = router;
