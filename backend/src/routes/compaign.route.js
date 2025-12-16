const express = require("express");
const { authMiddleware, adminOnly } = require("../middleware/user.middleware.js");
const {
  listNGOCampaigns,
  createCampaign,
  getCampaignById,
  donateToCampaign,
  deleteCampaignById,
  updateCampaignById
} = require("../controllers/campaign.controller.js");

const router = express.Router();

// Public routes
router.get("/ngos/campaigns", listNGOCampaigns);
router.get("/:id", getCampaignById);
router.put("/:id", authMiddleware, adminOnly, updateCampaignById);
router.delete("/:id", authMiddleware, adminOnly, deleteCampaignById);

// Admin (create campaign)
router.post("/ngos/campaigns", authMiddleware, adminOnly, createCampaign);

// Donate
router.post("/:id/donate", authMiddleware, donateToCampaign);

module.exports = router;
