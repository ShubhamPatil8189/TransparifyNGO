// Donor.js (optional if you separate)
const Donor = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // optional link
  name: String,
  email: String,
  phone: String,
  totalDonated: { type: Number, default: 0 },
  donorBadges: [String],
  createdAt: { type: Date, default: Date.now }
});
