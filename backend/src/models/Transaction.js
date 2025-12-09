const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  estimatedValue: { type: Number, required: true },
  imageUrls: [{ type: String }]
});

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true },          // 'financial' or 'in-kind'
  amount: { type: Number },                        // only for financial
  donor: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  paymentMethod: { type: String },                 // 'razorpay' for financial
  providerRef: { type: String },                   // Razorpay payment ID if financial
  items: [ItemSchema],                             // only for in-kind donations
  receipt: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
