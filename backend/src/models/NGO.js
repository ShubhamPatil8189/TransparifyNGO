// NGO.js
const NGO = new Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  address: String,
  contactEmail: String,
  createdAt: { type: Date, default: Date.now },
  settings: {
    openTransparency: { type: Boolean, default: false }
  }
});
