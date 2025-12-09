const crypto = require("crypto");
const Transaction = require("../models/Transaction");

// POST /api/payments/webhook/razorpay
exports.handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET; // Set in .env
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    } 

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "payment.captured") {
      const payment = payload.payment.entity;

      // Find transaction in DB using Razorpay payment ID (providerRef)
      const transaction = await Transaction.findOne({ providerRef: payment.id });
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Mark transaction as completed (optional: you can add a "status" field)
      transaction.status = "completed";
      await transaction.save();

      console.log(`Payment ${payment.id} verified and transaction marked completed.`);
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
