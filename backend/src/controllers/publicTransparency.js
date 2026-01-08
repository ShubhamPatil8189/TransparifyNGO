
const Transaction = require("../models/Transaction");
const InventoryItem = require("../models/Inventory");
const path = require("path");
const logoPath = path.join(__dirname, "../assets/logo.png");

exports.getPublicTransparency = async (req, res) => {
  try {
    // Total financial donation amount
    const financialStats = await Transaction.aggregate([
      { $match: { type: "financial" } }, // Removed status check as it's not in schema
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
        $project: {
          totalValue: { $sum: "$items.estimatedValue" }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalEstimatedValue: { $sum: "$totalValue" }
        }
      }
    ]);

    // Inventory stats
    const inventoryCount = await InventoryItem.countDocuments();

    // Latest donations (NO PII except name as requested) - Fetch all for scrolling list
    const recentTransactions = await Transaction.find(
      {},
      { "donor.email": 0 } // Keep email hidden, show name
    )
      .populate("campaign", "title")
      .sort({ createdAt: -1 });
    // .limit(5); // Removed limit as requested

    // All Campaigns (Active & Inactive)
    const campaigns = await require("../models/campaign.model").find(
      {}, // Fetch all campaigns
      { title: 1, totalRaised: 1, goalAmount: 1, image: 1, deadline: 1, status: 1 }
    ).sort({ createdAt: -1 }).limit(6);

    // Map campaigns to match frontend expectation (targetAmount)
    const mappedCampaigns = campaigns.map(c => ({
      ...c.toObject(),
      targetAmount: c.goalAmount
    }));

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
        campaigns: mappedCampaigns,
      },
    });
  } catch (err) {
    console.error("Transparency Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch public transparency stats" });
  }
};

exports.generateTransparencyReport = async (req, res) => {
  try {
    const PDFDocument = require("pdfkit");
    const axios = require("axios"); // Import axios for logo fetching

    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Transparency_Report.pdf"
    );

    doc.pipe(res);

    // --- Header ---
    const headerHeight = 80;
    const pageWidth = doc.page.width;

    // Background color
    doc
      .rect(0, 0, pageWidth, headerHeight)
      .fill("#0E7C86");

    // Logo - Fetch from URL
    try {
      const logoUrl = "https://image2url.com/images/1765261019797-8a1ad951-be88-4d7a-9780-6136d5f50f6d.png";
      const logoResponse = await axios.get(logoUrl, { responseType: "arraybuffer" });
      const logoBuffer = Buffer.from(logoResponse.data, "binary");
      doc.image(logoBuffer, 50, 18, { width: 44 });
    } catch (error) {
      console.error("Failed to fetch logo:", error);
      // Fallback or skip logo
    }

    // Title
    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(
        "TransparifyNGO Transparency Report",
        110,
        30,
        { align: "left" }
      );

    // Reset color
    doc.fillColor("black");

    doc.moveDown(4);

    // Generated date
    doc
      .fontSize(12)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "center",
      });

    doc.moveDown(2);

    /* ================= FINANCIAL SUMMARY ================= */
    const Transaction = require("../models/Transaction");

    const financialStats = await Transaction.aggregate([
      { $match: { type: "financial" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const inKindStats = await Transaction.aggregate([
      { $match: { type: "in-kind" } },
      { $project: { totalValue: { $sum: "$items.estimatedValue" } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalEstimatedValue: { $sum: "$totalValue" },
        },
      },
    ]);

    const totalRaised = financialStats[0]?.totalAmount || 0;
    const totalDonations = financialStats[0]?.count || 0;
    const inKindValue = inKindStats[0]?.totalEstimatedValue || 0;
    const inKindCount = inKindStats[0]?.count || 0;

    doc.fontSize(16).font("Helvetica-Bold").text("Financial Summary");
    doc.moveDown(0.5);
    doc.fontSize(12).font("Helvetica");
    doc.text(`Total Funds Raised: Rs. ${totalRaised.toLocaleString()}`);
    doc.text(`Total Financial Donations: ${totalDonations}`);
    doc.text(`Estimated In-Kind Value: Rs. ${inKindValue.toLocaleString()}`);
    doc.text(`Total In-Kind Gifts: ${inKindCount}`);
    doc.moveDown(2);

    /* ================= CAMPAIGNS OVERVIEW ================= */
    doc.fontSize(16).font("Helvetica-Bold").text("Campaigns Overview");
    doc.moveDown(0.5);

    const Campaign = require("../models/campaign.model");
    const campaigns = await Campaign.find(
      {},
      { title: 1, totalRaised: 1, goalAmount: 1, status: 1 }
    );

    let y = doc.y;

    doc.fontSize(10).font("Helvetica-Bold");
    doc.text("Campaign Title", 50, y);
    doc.text("Raised", 300, y);
    doc.text("Goal", 400, y);
    doc.text("Status", 500, y);

    doc.moveDown();
    doc.font("Helvetica");

    campaigns.forEach((c) => {
      y = doc.y;
      doc.text(c.title.substring(0, 40), 50, y);
      doc.text(`Rs. ${c.totalRaised.toLocaleString()}`, 300, y);
      doc.text(`Rs. ${c.goalAmount.toLocaleString()}`, 400, y);
      doc.text(c.status, 500, y);
      doc.moveDown(0.5);
    });

    /* ================= DONATION HISTORY ================= */
    doc.addPage();

    doc.fontSize(16).font("Helvetica-Bold").text("Recent Donation History");
    doc.moveDown(0.5);

    const transactions = await Transaction.find({}, { "donor.email": 0 })
      .populate("campaign", "title")
      .sort({ createdAt: -1 });

    y = doc.y;

    doc.fontSize(10).font("Helvetica-Bold");
    doc.text("Date", 50, y);
    doc.text("Donor", 120, y);
    doc.text("Campaign", 240, y);
    doc.text("Type", 330, y);
    doc.text("Amount", 420, y);
    doc.text("Status", 520, y);

    doc.moveDown();
    doc.font("Helvetica");

    transactions.forEach((tx) => {
      y = doc.y;

      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      const date = new Date(tx.createdAt).toLocaleDateString();
      const type = tx.type === "financial" ? "Financial" : "In-Kind";
      const amount =
        tx.type === "financial"
          ? `Rs. ${tx.amount?.toLocaleString()}`
          : `Est. Rs. ${(
            tx.items?.reduce(
              (sum, item) => sum + item.estimatedValue,
              0
            ) || 0
          ).toLocaleString()}`;

      doc.text(date, 50, y);
      doc.text(tx.donor?.name || "Anonymous", 120, y);
      doc.text(tx.campaign?.title || "N/A", 240, y);
      doc.text(type, 330, y);
      doc.text(amount, 420, y);
      doc.text("Verified", 520, y);

      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error("Report Generation Error:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
