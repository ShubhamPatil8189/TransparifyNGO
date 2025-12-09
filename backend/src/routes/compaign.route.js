import express from "express";
import { authMiddleware, adminOnly } from "../middleware/user.middleware.js";
import {
  listNGOCampaigns,
  createCampaign,
  getCampaignById,
  donateToCampaign
} from "../controllers/campaign.controller.js";

const router = express.Router();

// Public
router.get("/ngos/campaigns", listNGOCampaigns);
router.get("/:id", getCampaignById);

// Admin (create campaign)
router.post("/ngos/campaigns", authMiddleware, adminOnly, createCampaign);

// Donate
router.post("/:id/donate", authMiddleware, donateToCampaign);

export default router;
