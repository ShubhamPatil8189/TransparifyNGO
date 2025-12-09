// models/Inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  description: { type: String, required: true },
  estimatedValue: { type: Number, required: true },
  donor: { type: String, required: true },
  images: [{ type: String }],      // store image URLs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema);
