import { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { CampaignChart } from "@/components/dashboard/CampaignChart";
import { FundAllocationChart } from "@/components/dashboard/FundAllocationChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DollarSign, Gift, Megaphone, Users } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalInKindValue: 0,
    activeCampaigns: 0,
    totalDonors: 0,
    recentTransactions: [],
  });
  const [charts, setCharts] = useState({
    financialChartData: [],
    campaignChartData: [],
    fundAllocationData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/dashboard/stats", {
          withCredentials: true,
        });
        if (res.data.success) {
          setStats({
            ...res.data.stats,
            recentTransactions: res.data.recentTransactions,
          });
          setCharts(res.data.charts || {
            financialChartData: [],
            campaignChartData: [],
            fundAllocationData: [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background m-0 p-0">
      <DashboardHeader />

      <main className="p-6 pt-16"> {/* <-- add top padding so content is visible under sticky header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">NGO Financial Management & Transparency Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Donations (All Time):"
            value={`₹${stats.totalDonations.toLocaleString()}`}
            icon={DollarSign}
            trend="↑"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Total In-Kind Value:"
            value={`₹${stats.totalInKindValue.toLocaleString()}`}
            icon={Gift}
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Active Campaigns:"
            value={stats.activeCampaigns}
            icon={Megaphone}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Total Donors:"
            value={stats.totalDonors.toLocaleString()}
            icon={Users}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FinancialChart data={charts.financialChartData} />
          <CampaignChart data={charts.campaignChartData} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundAllocationChart data={charts.fundAllocationData} />
          <RecentTransactions transactions={stats.recentTransactions} />
        </div>
      </main>
    </div>
  );
}
