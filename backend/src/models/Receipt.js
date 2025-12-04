// Receipt.js
const Receipt = new Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  pdfUrl: String,
  qrCodeData: String, // encoded verification link/hash
  issuedAt: { type: Date, default: Date.now },
  verificationHash: String
});
