const Transaction = require("../models/Transaction");

// GET /api/transactions/all
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
    