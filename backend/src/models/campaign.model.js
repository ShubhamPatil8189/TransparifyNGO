const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: String,
  description: String,
  goalAmount: Number,
  collectedAmount: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  bannerUrl: String,
  updates: [{ text: String, mediaUrl: String, date: Date }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
