const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donor.controller");
const donorMiddleware = require("../middleware/donor.middleware");
const { authMiddleware, adminOnly } = require("../middleware/user.middleware.js");

// Get all donors
router.get("/getAllDonors", authMiddleware, adminOnly, donorController.getAllDonors);

// Get donor by userId
router.get("/:id", authMiddleware, adminOnly, donorController.getDonorById);

// Create or update donor after donation
router.post("/update", authMiddleware, adminOnly, donorMiddleware.validateDonorPayload, donorController.createOrUpdateDonor);

module.exports = router;
