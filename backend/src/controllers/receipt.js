const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Transaction = require("../models/Transaction");

// GET /api/transactions/:id/receipt
exports.getTransactionReceipt = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Generate PDF dynamically
    const receiptFileName = `receipt_${transaction._id}.pdf`;
    const receiptPath = path.join(__dirname, "../receipts", receiptFileName);

    // Ensure receipts directory exists
    if (!fs.existsSync(path.join(__dirname, "../receipts"))) {
      fs.mkdirSync(path.join(__dirname, "../receipts"));
    }

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(receiptPath));

    // PDF content
    doc.fontSize(20).text("Donation Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Receipt No: ${transaction.receipt}`);
    doc.text(`Date: ${transaction.createdAt.toDateString()}`);
    doc.text(`Donor Name: ${transaction.donor.name}`);
    doc.text(`Donor Email: ${transaction.donor.email}`);
    doc.text(`Type: ${transaction.type}`);
    if (transaction.type === "financial") {
      doc.text(`Amount: ₹${transaction.amount}`);
      doc.text(`Payment Method: ${transaction.paymentMethod}`);
      doc.text(`Provider Ref: ${transaction.providerRef}`);
    } else if (transaction.type === "in-kind") {
      doc.text("Items:");
      transaction.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.description} - Estimated Value: ₹${item.estimatedValue}`);
        if (item.imageUrls && item.imageUrls.length > 0) {
          doc.text(`   Images: ${item.imageUrls.join(", ")}`);
        }
      });
    }

    doc.end();

    // Return PDF link + verification data
    const baseUrl = req.protocol + "://" + req.get("host");
    const pdfLink = `${baseUrl}/receipts/${receiptFileName}`;

    res.status(200).json({
      receiptLink: pdfLink,
      verificationData: transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
