const Transaction = require("../models/Transaction");
const Campaign = require("../models/campaign.model");
const User = require("../models/user.model");
const Inventory = require("../models/Inventory");
const Donor = require("../models/donor.model");

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Total Donations (Financial)
        const totalMoneyAgg = await Transaction.aggregate([
            { $match: { type: "financial" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
        ]);
        const totalDonations = totalMoneyAgg.length > 0 ? totalMoneyAgg[0].totalAmount : 0;

        // 2. Total In-Kind Value
        // 2. Total In-Kind Value
        const totalInKindAgg = await Transaction.aggregate([
            { $match: { type: "in-kind" } },
            { $unwind: "$items" },
            { $group: { _id: null, totalValue: { $sum: "$items.estimatedValue" } } }
        ]);
        const totalInKindValue = totalInKindAgg.length > 0 ? totalInKindAgg[0].totalValue : 0;

        // 3. Active Campaigns (using 'published' status)
        const activeCampaigns = await Campaign.countDocuments({ status: "published" });

        // 4. Total Donors
        const totalDonors = await Donor.countDocuments();

        // 5. Recent Transactions
        const recentTransactions = await Transaction.find()
            .sort({ createdAt: -1 })
            .limit(5);

        // 6. Financial Chart Data (Last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const financialChartAgg = await Transaction.aggregate([
            {
                $match: {
                    type: "financial",
                    createdAt: { $gte: sixMonthsAgo },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    income: { $sum: "$amount" },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const financialChartData = financialChartAgg.map((item) => ({
            month: monthNames[item._id.month - 1],
            income: item.income,
            spend: Math.floor(item.income * 0.4), // Mocking spend
        }));

        // 7. Campaign Chart Data
        const campaignChartDataAgg = await Campaign.find({ status: "published" })
            .sort({ totalRaised: -1 })
            .limit(5)
            .select("title totalRaised");

        const campaignChartData = campaignChartDataAgg.map(c => ({
            name: c.title,
            value: c.totalRaised,
            color: "hsl(var(--primary))"
        }));

        // 8. Fund Allocation Data
        const fundAllocationData = [
            { name: "Program Services", value: 65, color: "hsl(var(--chart-teal))" },
            { name: "Administrative", value: 15, color: "hsl(var(--primary))" },
            { name: "Fundraising", value: 10, color: "hsl(var(--chart-green))" },
            { name: "Reserves", value: 10, color: "hsl(var(--chart-red))" },
        ];

        res.status(200).json({
            success: true,
            stats: {
                totalDonations,
                totalInKindValue,
                activeCampaigns,
                totalDonors,
            },
            recentTransactions,
            charts: {
                financialChartData,
                campaignChartData,
                fundAllocationData
            }
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
        });
    }
};
