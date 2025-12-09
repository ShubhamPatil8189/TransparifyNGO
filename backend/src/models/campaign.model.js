// Campaign.js
import mongoose, { Schema } from 'mongoose';
const campaignSchema = new mongoose.Schema({
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


export default mongoose.model('Campaign', campaignSchema);