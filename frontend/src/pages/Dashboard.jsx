import DashboardHeader from "@/components/layout/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { CampaignChart } from "@/components/dashboard/CampaignChart";
import { FundAllocationChart } from "@/components/dashboard/FundAllocationChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DollarSign, Gift, Megaphone, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">NGO Financial Management & Transparency Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Donations (This Month):"
            value="$154,500"
            icon={DollarSign}
            trend="↑"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Total In-Kind Value:"
            value="$28,000"
            icon={Gift}
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Active Campaigns:"
            value="8"
            icon={Megaphone}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Total Donors:"
            value="3,240"
            icon={Users}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FinancialChart />
          <CampaignChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundAllocationChart />
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
}
