const Transaction = require("../models/Transaction");

// GET /api/receipts/:id/verify
exports.verifyReceipt = async (req, res) => {
  try {
    const receiptId = req.params.id;

    // Find transaction by receipt number
    const transaction = await Transaction.findOne({ receipt: receiptId });

    if (!transaction) {
      return res.status(404).json({
        verificationStatus: "invalid",
        message: "Receipt not found or invalid",
      });
    }

    // If found → receipt is valid
    return res.status(200).json({
      verificationStatus: "valid",
      transaction: {
        id: transaction._id,
        type: transaction.type,
        donor: transaction.donor,
        amount: transaction.amount || null,
        items: transaction.items || [],
        createdAt: transaction.createdAt,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      verificationStatus: "error",
      message: "Server error",
      error: error.message,
    });
  }
};
