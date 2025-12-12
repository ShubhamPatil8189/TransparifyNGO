const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const Transaction = require("../models/Transaction");

exports.getTransactionReceipt = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findOne({ receipt: id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const receiptDir = path.join(__dirname, "../receipts");
    if (!fs.existsSync(receiptDir)) fs.mkdirSync(receiptDir);

    const receiptFile = `receipt_${transaction._id}.pdf`;
    const receiptPath = path.join(receiptDir, receiptFile);

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    doc.pipe(fs.createWriteStream(receiptPath));

    /* HEADER */
    const logoPath = path.join(__dirname, "../assets/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 30, { width: 80 });
    }

    doc.fontSize(26).fillColor("#0a2463").text("TransparifyNGO", 130, 40);
    doc.fontSize(14).fillColor("#333").text("Official Donation Receipt", 130, 70);

    doc.moveDown(2);

    /* WATERMARK */
    doc.fontSize(80)
      .fillColor("#eaeaea")
      .opacity(0.4)
      .text("TRANSPARIFY", 80, 180, { angle: 30 });
    doc.opacity(1);

    /* RECEIPT DETAILS */
    doc.moveDown();
    doc.rect(40, 150, 520, 60).fill("#f1f5ff").stroke("#c7d2fe");
    doc.fillColor("#0a2463").fontSize(20)
       .text("Receipt Information", 50, 165);

    doc.fontSize(12).fillColor("#333");
    doc.text(`Receipt No: ${transaction.receipt}`, 50, 200);
    doc.text(`Issued On: ${new Date(transaction.createdAt).toDateString()}`, 330, 200);

    doc.moveDown();

    /* DONOR SECTION */
    doc.moveDown();
    doc.fillColor("#0a2463").fontSize(18).text("Donor Details");
    doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke("#cbd5e1");

    doc.fontSize(12).fillColor("#333");
    doc.text(`Name: ${transaction.donor.name}`);
    doc.text(`Email: ${transaction.donor.email}`);
    doc.moveDown();

    /* DONATION DETAILS */
    doc.fillColor("#0a2463").fontSize(18).text("Donation Details");
    doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke("#cbd5e1");

    doc.fontSize(12).fillColor("#333");

    doc.text(`Donation Type: ${transaction.type}`);
    
    if (transaction.type === "financial") {
      doc.text(`Amount Donated: ₹${transaction.amount}`);
      doc.text(`Payment Method: ${transaction.paymentMethod}`);
      doc.text(`Provider Ref: ${transaction.providerRef}`);
    }

    if (transaction.type === "in-kind") {
      doc.moveDown();
      doc.fontSize(14).fillColor("#444").text("Items Donated:");

      transaction.items.forEach((item, index) => {
        doc.fontSize(12)
          .fillColor("#333")
          .text(`${index + 1}. ${item.description} (₹${item.estimatedValue})`);

        if (item.imageUrls?.length > 0) {
          doc.fillColor("#6b7280").text(`Images: ${item.imageUrls.join(", ")}`);
        }
      });
    }

    doc.moveDown(2);

    /* ----------------------------------------------
       QR CODE (UPDATED) → Uses receipt number instead of ID
       Example: /api/receipts/INKIND-1765264913127/verify
       ---------------------------------------------- */
    const verifyUrl = `${req.protocol}://${req.get("host")}/api/receipts/${transaction.receipt}/verify`;

    const qrDataUrl = await QRCode.toDataURL(verifyUrl);

    doc.fontSize(16).fillColor("#0a2463").text("Scan to Verify Receipt:");
    doc.image(qrDataUrl, { fit: [130, 130] });
    doc.moveDown();

    doc.fontSize(10).fillColor("#555").text(verifyUrl);

    /* FOOTER */
    doc.moveDown(4);
    doc.fontSize(12).fillColor("#666")
      .text("Thank you for supporting TransparifyNGO. Your contribution makes real impact.", {
        align: "center",
      });

    doc.moveDown();
    doc.fontSize(10).text("This is a digitally generated receipt and does not require a signature.", {
      align: "center",
    });

    doc.end();

    const fileUrl = `${req.protocol}://${req.get("host")}/receipts/${receiptFile}`;

    // res.status(200).json({
    //   success: true,
    //   receiptLink: fileUrl,
    //   verifyQR: verifyUrl,
    //   message: "Advanced receipt generated successfully",
    // });

    return res.redirect(fileUrl);


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Receipt generation failed", error: err.message });
  }
};
