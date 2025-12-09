const path = require("path");
const fs = require("fs");
const Transaction = require("../models/Transaction");

// GET /api/receipts/:id/pdf
exports.getReceiptPdf = async (req, res) => {
  try {
    const receiptId = req.params.id;

    // Find transaction using receipt number
    const transaction = await Transaction.findOne({ receipt: receiptId });
    if (!transaction) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    // Construct file path
    const receiptFileName = `receipt_${transaction._id}.pdf`;
    const filePath = path.join(__dirname, "../receipts", receiptFileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Receipt PDF not found. It may not be generated yet."
      });
    }

    // Generate downloadable/public link
    const baseUrl = req.protocol + "://" + req.get("host");
    const pdfLink = `${baseUrl}/receipts/${receiptFileName}`;

    return res.status(200).json({
      pdfLink,
      receiptId: transaction.receipt,
      transactionId: transaction._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
