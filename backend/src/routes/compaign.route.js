const express = require("express");
const { authMiddleware, adminOnly } = require("../middleware/user.middleware.js");
const {
  listNGOCampaigns,
  createCampaign,
  getCampaignById,
  donateToCampaign
} = require("../controllers/campaign.controller.js");

const router = express.Router();

// Public routes
router.get("/ngos/campaigns", listNGOCampaigns);
router.get("/:id", getCampaignById);

// Admin (create campaign)
router.post("/ngos/campaigns", authMiddleware, adminOnly, createCampaign);

// Donate
router.post("/:id/donate", authMiddleware, donateToCampaign);

module.exports = router;
