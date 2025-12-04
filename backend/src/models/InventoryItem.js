// InventoryItem.js
const InventoryItem = new Schema({
  ngoId: { type: Schema.Types.ObjectId, ref: 'NGO' },
  donatedBy: { type: Schema.Types.ObjectId, ref: 'Donor' },
  description: String,
  images: [String],
  estimatedValue: Number,
  status: { type: String, enum: ['available','distributed','disposed'], default: 'available' },
  receivedAt: { type: Date, default: Date.now },
  distributionRecord: { toBeneficiaryId: String, date: Date, proofUrl: String }
});
