const Transaction = require("../models/Transaction");

// POST /api/transactions/in-kind
exports.createInKindTransaction = async (req, res) => {
  try {
    const { donor, items } = req.body;

    if (!donor || !donor.name || !donor.email || !items || !items.length) {
      return res.status(400).json({ message: "Donor info and items are required." });
    }

    for (const item of items) {
      if (!item.description || !item.estimatedValue) {
        return res.status(400).json({ message: "Each item must have description and estimatedValue." });
      }
    }

    const receipt = `INKIND-${Date.now()}`;

    const transaction = await Transaction.create({
      type: "in-kind",
      donor,
      items,
      receipt,
    });

    res.status(201).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
