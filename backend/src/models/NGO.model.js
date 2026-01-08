const mongoose = require('mongoose');
const { Schema } = mongoose;

const ngoSchema = new Schema({
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

module.exports = mongoose.model('NGO', ngoSchema);
