const Campaign = require("../models/campaign.model.js");
const Transaction = require("../models/Transaction.js");
const Receipt = require("../models/receipt.model.js");
const Donor = require("../models/donor.model.js");
const listNGOCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    // Add status dynamically
    const formattedCampaigns = campaigns.map((campaign) => {
      const now = new Date();
      let status;

    // If campaign is marked completed in DB → force Ended
    if (campaign.status === "completed") {
      status = "Ended";
    } else {
      status =
        now >= campaign.createdAt && now <= campaign.deadline
          ? "Active"
          : "Ended";
    }

      return {
        _id: campaign._id,
        title: campaign.title,
        goalAmount: campaign.goalAmount,
        collectedAmount: campaign.totalRaised || 0,
        startDate: campaign.createdAt,
        endDate: campaign.deadline,
        status,
      };
    });

    res.status(200).json(formattedCampaigns);
  } catch (error) {
    console.error("List All Campaigns Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      goalAmount,
      deadline,
      bannerUrl,
      status, // "draft" or "published"
    } = req.body;

    // basic validation
    if (!title || !description || !goalAmount || !deadline) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const campaign = await Campaign.create({
      ngoId: req.user.ngoId, // from auth middleware
      title,
      description,
      goalAmount,
      deadline,
      bannerUrl,
      status: status || "draft", // default draft
      updates: [], // initially empty
    });

    res.status(201).json({
      message:
        campaign.status === "published"
          ? "Campaign published successfully"
          : "Campaign saved as draft",
      campaign,
    });
  } catch (error) {
    console.error("Create Campaign Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const now = new Date();
    let status;

    // If campaign is marked completed in DB → force Ended
    if (campaign.status === "completed") {
      status = "Ended";
    } else {
      status =
        now >= campaign.createdAt && now <= campaign.deadline
          ? "Active"
          : "Ended";
    }

    res.status(200).json({
      _id: campaign._id,
      title: campaign.title,
      goalAmount: campaign.goalAmount,
      collectedAmount: campaign.totalRaised || 0,
      startDate: campaign.createdAt,
      endDate: campaign.deadline,
      status,
      description: campaign.description || "",
      bannerUrl: campaign.bannerUrl || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const donateToCampaign = async (req, res) => {
  try {
    const { type, amount, donor, paymentMethod, providerRef, inKindDetails } = req.body;

    // ===============================
    // 1. Validate Campaign
    // ===============================
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // ===============================
    // 2. Basic Validation
    // ===============================
    if (!type || !donor?.name || !donor?.email) {
      return res.status(400).json({ message: "Donation type and donor info are required" });
    }

    if (type === "financial" && (!amount || !paymentMethod)) {
      return res.status(400).json({ message: "Amount & payment method required for financial donation" });
    }

    if (type === "in-kind" && (!inKindDetails?.items || inKindDetails.items.length === 0)) {
      return res.status(400).json({ message: "At least one in-kind item is required" });
    }

    // ===============================
    // 3. Calculate Donation Amount
    // ===============================
    let donationAmount = 0;
    if (type === "financial") donationAmount = Number(amount);
    else if (type === "in-kind") donationAmount = inKindDetails.items.reduce((sum, item) => sum + Number(item.estimatedValue || 0), 0);

    // ===============================
    // 4. Create Transaction
    // ===============================
    const transactionData = { type, donor, createdAt: new Date() };
    if (type === "financial") {
      transactionData.amount = Number(amount);
      transactionData.paymentMethod = paymentMethod;
      transactionData.providerRef = providerRef;
    } else if (type === "in-kind") {
      transactionData.items = inKindDetails.items.map(item => ({
        description: item.description,
        estimatedValue: Number(item.estimatedValue),
        date: new Date(),
      }));
    }

    const transaction = await Transaction.create(transactionData);

    // ===============================
    // 5. Update Campaign
    // ===============================
    campaign.totalRaised = (campaign.totalRaised || 0) + donationAmount;
    campaign.donorCount = (campaign.donorCount || 0) + 1;
    if (campaign.status !== "completed" && campaign.totalRaised >= campaign.goalAmount) {
      campaign.status = "completed";
    }
    await campaign.save();

    // ===============================
    // 6. Create Receipt
    // ===============================
    const receipt = await Receipt.create({
      transactionId: transaction._id,
      pdfUrl: null,
      qrCodeData: null,
      verificationHash: null,
    });
    transaction.receipt = receipt._id.toString();
    await transaction.save();

    // ===============================
    // 7. CREATE / UPDATE DONOR
    // ===============================
    let donorRecord = await Donor.findOne({ email: donor.email });

    const financialEntry = type === "financial" ? {
      campaignName: campaign.title,
      amount: Number(amount),
      date: new Date(),
    } : null;

    const inKindEntry = type === "in-kind" ? inKindDetails.items.map(item => ({
      campaignName: campaign.title,
      description: item.description,
      estimatedValue: Number(item.estimatedValue),
      date: new Date(),
    })) : [];

    const totalThisDonation = donationAmount;

    if (!donorRecord) {
      donorRecord = await Donor.create({
        userId: donor.userId || null,
        name: donor.name,
        email: donor.email,
        totalDonated: totalThisDonation,
        campaignDonated: [campaign.title],
        financialDetails: financialEntry ? [financialEntry] : [],
        inKindDetails: inKindEntry.length ? inKindEntry : [],
      });
    } else {
      // Existing donor
      donorRecord.totalDonated = (donorRecord.totalDonated || 0) + totalThisDonation;

      if (!donorRecord.campaignDonated.includes(campaign.title)) {
        donorRecord.campaignDonated.push(campaign.title);
      }

      if (financialEntry) donorRecord.financialDetails.push(financialEntry);
      if (inKindEntry.length) donorRecord.inKindDetails.push(...inKindEntry);

      await donorRecord.save();
    }

    // ===============================
    // 8. RESPONSE
    // ===============================
    res.status(201).json({
      message: "Donation successful",
      transaction,
      receipt,
      donor: donorRecord,
      campaign: {
        id: campaign._id,
        title: campaign.title,
        totalRaised: campaign.totalRaised,
        goalAmount: campaign.goalAmount,
        donorCount: campaign.donorCount,
        status: campaign.status,
        goalReached: campaign.totalRaised >= campaign.goalAmount,
      },
    });

  } catch (error) {
    console.error("Donation Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const deleteCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const { title, goalAmount, deadline, description } = req.body;

    campaign.title = title ?? campaign.title;
    campaign.goalAmount = goalAmount ?? campaign.goalAmount;
    campaign.deadline = deadline ?? campaign.deadline;
    campaign.description = description ?? campaign.description;

    await campaign.save();

    res.status(200).json({ message: "Campaign updated successfully", campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  listNGOCampaigns,
  createCampaign,
  getCampaignById,
  donateToCampaign,
  deleteCampaignById,
  updateCampaignById
};
