const mongoose = require("mongoose");
const { Schema } = mongoose;

const DonorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  totalDonated: { type: Number, default: 0 },

  // In-kind donations per campaign
  inKindDetails: [
    {
      campaignName: { type: String, required: true },
      description: { type: String, required: true },
      estimatedValue: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],

  // Financial donations per campaign
  financialDetails: [
    {
      campaignName: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],

  campaignDonated: [{ type: String }], // list of campaign names
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donor", DonorSchema);
