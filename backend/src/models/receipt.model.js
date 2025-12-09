// Receipt.js
import mongoose, { Schema } from 'mongoose';
const receiptSchema = new mongoose.Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  pdfUrl: String,
  qrCodeData: String, // encoded verification link/hash
  issuedAt: { type: Date, default: Date.now },
  verificationHash: String
});


export default mongoose.model('Receipt', receiptSchema);