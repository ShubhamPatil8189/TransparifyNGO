// controllers/receiptController.js
const Transaction = require("../models/Transaction");

// GET /api/receipts/all
exports.getAllReceipts = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const receipts = transactions.map((txn) => {
      return {
        transactionId: txn._id,
        type: txn.type,
        donor: txn.donor,
        receipt: txn.receipt,
        createdAt: txn.createdAt,
        // PDF link now points to the PDF API using receipt field
        pdfLink: `${baseUrl}/api/receipts/${txn.receipt}/pdf`,
        // Verification link using receipt field
        verifyUrl: `${baseUrl}/api/receipts/${txn.receipt}/verify`,
      };
    });

    res.status(200).json({
      success: true,
      count: receipts.length,
      receipts,
    });
  } catch (err) {
    console.error("Error fetching all receipts:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
