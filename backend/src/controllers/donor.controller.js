const Donor = require("../models/donor.model");

// GET all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET single donor by userId
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// CREATE or UPDATE donor after donation
exports.createOrUpdateDonor = async (req, res) => {
  const { userId, name, email, amount, campaignName, inKind } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: "userId, name, and email are required" });
  }

  try {
    let donor = await Donor.findOne({ userId });

    // Prepare donation entries
    const financialEntry = amount
      ? {
          campaignName,
          amount,
          date: new Date(),
        }
      : null;

    const inKindEntry = inKind
      ? {
          campaignName,
          description: inKind.description,
          estimatedValue: inKind.estimatedValue,
          date: new Date(),
        }
      : null;

    // Total donation for this donation
    const donationTotal = (amount || 0) + (inKind?.estimatedValue || 0);

    if (!donor) {
      donor = new Donor({
        userId,
        name,
        email,
        totalDonated: donationTotal,
        campaignDonated: campaignName ? [campaignName] : [],
        financialDetails: financialEntry ? [financialEntry] : [],
        inKindDetails: inKindEntry ? [inKindEntry] : [],
      });
    } else {
      // Update existing donor
      donor.totalDonated += donationTotal;

      // Add campaign if not already present
      if (campaignName && !donor.campaignDonated.includes(campaignName)) {
        donor.campaignDonated.push(campaignName);
      }

      // Append financial donation
      if (financialEntry) {
        donor.financialDetails.push(financialEntry);
      }

      // Append in-kind donation
      if (inKindEntry) {
        donor.inKindDetails.push(inKindEntry);
      }
    }

    await donor.save();
    res.status(200).json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
