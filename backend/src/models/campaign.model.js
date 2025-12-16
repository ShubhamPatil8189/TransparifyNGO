const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    // // NGO / Admin reference
    // ngoId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "NGO",
    //   required: true,
    // },

    // Campaign basic info
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    goalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    deadline: {
      type: Date,
      required: true,
    },

    bannerUrl: {
      type: String, // uploaded image URL
    },

    // Campaign status
    status: {
      type: String,
      enum: ["draft", "published", "completed"],
      default: "draft",
    },

    // Analytics (future-ready)
    totalRaised: {
      type: Number,
      default: 0,
    },

    donorCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
