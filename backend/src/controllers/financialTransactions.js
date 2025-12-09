const Transaction = require("../models/Transaction");
const razorpay = require("../services/razorpay");

exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, donor, paymentMethod, providerRef } = req.body;

    if (!type || !amount || !donor || !paymentMethod || !providerRef) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Verify Razorpay payment
    const payment = await razorpay.payments.fetch(providerRef);
    if (!payment || payment.status !== "captured") {
      return res.status(400).json({ message: "Payment not verified." });
    }

    // Generate receipt number
    const receipt = `DON-${Date.now()}`;

    // Save transaction to DB
    const transaction = await Transaction.create({
      type,
      amount,
      donor,
      paymentMethod,
      providerRef,
      receipt,
    });

    return res.status(201).json({ transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
