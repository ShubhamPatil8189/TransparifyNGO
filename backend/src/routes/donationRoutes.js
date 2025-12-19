const express = require("express");
const router = express.Router();
const {
  getDonationOverview,
} = require("../controllers/donationOverviewController");

router.get("/donations/overview", getDonationOverview);

module.exports = router;
