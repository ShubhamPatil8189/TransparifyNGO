
const Transaction = require("../models/Transaction");
const InventoryItem = require("../models/Inventory");

exports.getPublicTransparency = async (req, res) => {
  try {
    // Total financial donation amount
    const financialStats = await Transaction.aggregate([
      { $match: { type: "financial", status: "completed" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    // In-kind donations
    const inKindStats = await Transaction.aggregate([
      { $match: { type: "in-kind" } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalEstimatedValue: { $sum: "$estimatedValue" }
        }
      }
    ]);

    // Inventory stats
    const inventoryCount = await InventoryItem.countDocuments();

    // Latest 5 donations (NO PII)
    const recentTransactions = await Transaction.find(
      {},
      { "donor.email": 0, "donor.name": 0 } // remove PII
    )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        financial: {
          totalAmount: financialStats[0]?.totalAmount || 0,
          count: financialStats[0]?.count || 0,
        },
        inKind: {
          count: inKindStats[0]?.count || 0,
          totalEstimatedValue: inKindStats[0]?.totalEstimatedValue || 0,
        },
        inventory: {
          totalItems: inventoryCount,
        },
        recent: recentTransactions,
      },
    });
  } catch (err) {
    console.error("Transparency Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch public transparency stats" });
  }
};
