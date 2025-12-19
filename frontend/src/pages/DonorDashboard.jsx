import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DonorNavbar from "@/components/layout/DonorNavbar";
import { Shield, Heart, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Shield, label: "Champion Donor", color: "bg-primary" },
  { icon: Heart, label: "Sustainer", color: "bg-green-500" },
  { icon: Award, label: "Transparency Advocate", color: "bg-primary" },
];

const DonorDashboard = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [donations, setDonations] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch logged-in user
        const userRes = await fetch("http://localhost:4000/api/user/me", {
          credentials: "include",
        });
        const userData = await userRes.json();

        if (userRes.ok) {
          setUserName(userData.name || "Donor");
        }

        // Fetch donation overview
        const donationRes = await fetch(
          "http://localhost:4000/api/donations/overview",
          {
            credentials: "include",
          }
        );
        const donationData = await donationRes.json();

        if (donationRes.ok && donationData.success) {
          setTotalCount(donationData.stats.totalDonations || 0);
          setTotalDonated(donationData.stats.totalDonatedMoney || 0);

          // Format donation history
          const formattedDonations = donationData.recentDonations.map(
            (donation) => {
              const isFinancial = donation.type === "financial";

              return {
                id: donation._id,
                date: new Date(donation.createdAt).toLocaleDateString(),
                ngo: donation.donor?.name || "Unknown NGO",
                project: isFinancial
                  ? "Financial Donation"
                  : donation.items?.[0]?.description || "In-Kind Donation",
                amount: isFinancial
                  ? `₹${donation.amount}`
                  : `₹${donation.items?.reduce(
                      (sum, item) => sum + item.estimatedValue,
                      0
                    )}`,
                status: "Completed",
                createdAt: donation.createdAt,
              };
            }
          );

          setDonations(formattedDonations);

          // Build timeline data (monthly)
          const monthlyTotals = {};
          donationData.recentDonations.forEach((donation) => {
            const month = new Date(donation.createdAt).toLocaleString("default", {
              month: "short",
            });

            const amount =
              donation.type === "financial"
                ? donation.amount
                : donation.items?.reduce(
                    (sum, item) => sum + item.estimatedValue,
                    0
                  );

            monthlyTotals[month] =
              (monthlyTotals[month] || 0) + amount;
          });

          const timeline = Object.keys(monthlyTotals).map((month) => ({
            month,
            amount: monthlyTotals[month],
          }));

          setTimelineData(timeline);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <DonorNavbar userName={userName} />

      {/* HERO */}
      <section
        className="py-12 text-white"
        style={{
          background:
            "linear-gradient(135deg, hsl(160, 85%, 35%) 0%, hsl(120, 70%, 55%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {userName || "Donor"} 👋
          </h1>
          <p className="text-white/80 mt-1">
            Your generosity is creating real impact.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-6 mt-8">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`${badge.color} w-12 h-12 rounded-full flex items-center justify-center shadow`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-md">
            <div className="bg-white/15 backdrop-blur px-6 py-5 rounded-xl">
              <p className="text-sm text-white/70">Total Donated</p>
              <p className="text-3xl font-bold mt-1">₹{totalDonated}</p>
            </div>
            <div className="bg-white/15 backdrop-blur px-6 py-5 rounded-xl">
              <p className="text-sm text-white/70">Total Donations</p>
              <p className="text-3xl font-bold mt-1">{totalCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* Timeline */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Your Impact Timeline</h2>

          {timelineData.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No donation data available yet.
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Donation History */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Donation History
          </h2>

          {donations.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              You haven’t made any donations yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="py-3 text-left">Date</th>
                    <th className="py-3 text-left">NGO</th>
                    <th className="py-3 text-left">Project</th>
                    <th className="py-3 text-left">Amount</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-0 hover:bg-muted/40 transition"
                    >
                      <td className="py-3">{item.date}</td>
                      <td>{item.ngo}</td>
                      <td>{item.project}</td>
                      <td className="font-medium">{item.amount}</td>
                      <td>
                        <Badge className="bg-green-100 text-green-700">
                          {item.status}
                        </Badge>
                      </td>
                      <td>
                        <Link to={`donation/${item.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
