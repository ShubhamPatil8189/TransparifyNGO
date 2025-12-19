const Transaction = require("../models/Transaction");

exports.getDonationOverview = async (req, res) => {
  try {
    /* ------------------------------
       1. Total Donations Count
    ------------------------------ */
    const totalDonations = await Transaction.countDocuments();

    /* ------------------------------
       2. Total Financial Amount
    ------------------------------ */
    const totalMoneyAgg = await Transaction.aggregate([
      { $match: { type: "financial" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalDonatedMoney =
      totalMoneyAgg.length > 0 ? totalMoneyAgg[0].totalAmount : 0;

    /* ------------------------------
       3. Recent 5 Donations
    ------------------------------ */
    const recentDonations = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "type amount donor receipt createdAt paymentMethod items"
      );

    /* ------------------------------
       Response
    ------------------------------ */
    res.status(200).json({
      success: true,
      stats: {
        totalDonations,
        totalDonatedMoney,
      },
      recentDonations,
    });
  } catch (error) {
    console.error("Donation overview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation overview",
    });
  }
};
