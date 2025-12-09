const express = require("express");
const router = express.Router();
const { handleRazorpayWebhook } = require("../controllers/razorpayWebhook");

// Razorpay webhook
router.post("/razorpay", express.json({ type: "application/json" }), handleRazorpayWebhook);

module.exports = router;
