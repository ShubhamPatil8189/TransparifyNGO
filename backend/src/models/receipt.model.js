const mongoose = require('mongoose');
const { Schema } = mongoose;

const receiptSchema = new Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  pdfUrl: String,
  qrCodeData: String, // encoded verification link/hash
  issuedAt: { type: Date, default: Date.now },
  verificationHash: String
});

module.exports = mongoose.model('Receipt', receiptSchema);
