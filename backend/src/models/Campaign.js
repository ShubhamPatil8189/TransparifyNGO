// Campaign.js
const Campaign = new Schema({
  ngoId: { type: Schema.Types.ObjectId, ref: 'NGO' },
  title: String,
  description: String,
  goalAmount: Number,
  collectedAmount: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  updates: [{ text: String, mediaUrl: String, date: Date }],
  createdAt: { type: Date, default: Date.now }
});
