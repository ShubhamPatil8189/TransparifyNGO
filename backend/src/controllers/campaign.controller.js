import Campaign from "../models/campaign.model.js";
import Transaction from "../models/transaction.model.js";
import Receipt from "../models/receipt.model.js";

export const listNGOCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find(); // return all campaigns
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const createCampaign = async (req, res) => {
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

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const donateToCampaign = async (req, res) => {
  try {
    const { type, amount, donor, paymentProvider, paymentRef, inKindDetails } = req.body;

    // Validate campaign
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    // Basic validation
    if (!type || !donor?.name || !donor?.email) {
      return res.status(400).json({ message: "Donation type and donor info are required" });
    }

    // Financial donation validation
    if (type === "financial" && (!amount || !paymentProvider)) {
      return res.status(400).json({
        message: "Amount & Payment Provider are required for financial donations"
      });
    }

    // In-kind donation validation
    if (type === "in-kind" && (!inKindDetails?.items || inKindDetails.items.length === 0)) {
      return res.status(400).json({
        message: "In-kind donations must include items"
      });
    }

    // Create Transaction
    const transaction = await Transaction.create({
      campaignId: campaign._id,
      ngoId: campaign.ngoId,
      donorId: req.user?._id, // donor logged in optional
      donorSnapshot: donor,   // store donor details
      type,
      amount: type === "financial" ? amount : 0,
      currency: "INR",
      inKindDetails: type === "in-kind" ? inKindDetails : undefined,
      paymentProvider: type === "financial" ? paymentProvider : undefined,
      paymentRef: type === "financial" ? paymentRef : undefined,
      status: "completed",
    });

    // Update campaign amount only for financial donations
    if (type === "financial") {
      campaign.collectedAmount += amount;
      await campaign.save();
    }

    // Create Receipt Document
    const receipt = await Receipt.create({
      transactionId: transaction._id,
      pdfUrl: null, // PDF generated later
      qrCodeData: null,
      verificationHash: null
    });

    // Link receipt to transaction
    transaction.receiptId = receipt._id;
    await transaction.save();

    // Send response
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
