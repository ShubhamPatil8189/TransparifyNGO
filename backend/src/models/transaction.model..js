// Transaction.js
import mongoose, { Schema } from 'mongoose';
const transactionSchema = new mongoose.Schema({
  donorId: { type: Schema.Types.ObjectId, ref: 'Donor' },
  donorSnapshot: {}, // store donor name/email at time of transaction
  type: { type: String, enum: ['financial','in-kind','service','product'], required: true },
  amount: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  inKindDetails: {
    items: [{ description: String, estimatedValue: Number, imageUrl: String }],
    totalValuation: Number
  },
  paymentProvider: String, // Razorpay/Stripe/Manual
  paymentRef: String,
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  status: { type: String, enum: ['pending','completed','cancelled'], default: 'completed' },
  createdAt: { type: Date, default: Date.now },
  receiptId: { type: Schema.Types.ObjectId, ref: 'Receipt' },
  auditHash: String
});


export default mongoose.model('Transaction', transactionSchema);
