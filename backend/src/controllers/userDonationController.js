const Transaction = require("../models/Transaction");

/**
 * GET /api/donations/me
 * Fetch donation stats for logged-in user
 */
exports.getMyDonations = async (req, res) => {
  try {
    const userEmail = req.user.email; // set by auth middleware

    // Total number of donations
    const totalDonations = await Transaction.countDocuments({
      "donor.email": userEmail
    });

    // Total financial donations
    const totalMoneyAgg = await Transaction.aggregate([
      { $match: { type: "financial", "donor.email": userEmail } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalDonatedMoney = totalMoneyAgg.length
      ? totalMoneyAgg[0].totalAmount
      : 0;

    // Recent 5 donations (financial + in-kind)
    const recentDonations = await Transaction.find({
      "donor.email": userEmail
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-__v"); // exclude unnecessary fields

    res.status(200).json({
      success: true,
      stats: { totalDonations, totalDonatedMoney },
      recentDonations
    });
  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations for user"
    });
  }
};
