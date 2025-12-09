const Campaign = require("../models/campaign.model.js");
const Transaction = require("../models/Transaction.js");
const Receipt = require("../models/receipt.model.js");

const listNGOCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find(); // return all campaigns
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, startDate, endDate, bannerUrl } = req.body;

    const campaign = await Campaign.create({
      ngoId: req.user.ngoId,
      title,
      description,
      goalAmount,
      startDate,
      endDate,
      bannerUrl
    });

    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const donateToCampaign = async (req, res) => {
  try {
    const { type, amount, donor, paymentMethod, providerRef, inKindDetails } = req.body;

    // Validate campaign
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // Basic validation
    if (!type || !donor?.name || !donor?.email) {
      return res.status(400).json({ message: "Donation type and donor info are required" });
    }

    // Financial donation validation
    if (type === "financial" && (!amount || !paymentMethod)) {
      return res.status(400).json({
        message: "Amount & Payment Method are required for financial donations"
      });
    }

    // In-kind donation validation
    if (type === "in-kind" && (!inKindDetails?.items || inKindDetails.items.length === 0)) {
      return res.status(400).json({
        message: "In-kind donations must include items"
      });
    }

    // Build transaction object based on type
    const transactionData = {
      type,
      donor,
      createdAt: new Date()
    };

    if (type === "financial") {
      transactionData.amount = amount;
      transactionData.paymentMethod = paymentMethod;
      transactionData.providerRef = providerRef;
    } else if (type === "in-kind") {
      transactionData.items = inKindDetails.items;
    }

    // Create Transaction
    const transaction = await Transaction.create(transactionData);

    // Update campaign collected amount for financial donations
    if (type === "financial") {
      campaign.collectedAmount += amount;
      await campaign.save();
    }

    // Create a simple Receipt (store transaction._id as string)
    const receipt = await Receipt.create({
      transactionId: transaction._id,
      pdfUrl: null,
      qrCodeData: null,
      verificationHash: null
    });

    // Link receipt to transaction as a string
    transaction.receipt = receipt._id.toString();
    await transaction.save();

    res.status(201).json({
      message: "Donation successful",
      transaction,
      receipt
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  listNGOCampaigns,
  createCampaign,
  getCampaignById,
  donateToCampaign
};
