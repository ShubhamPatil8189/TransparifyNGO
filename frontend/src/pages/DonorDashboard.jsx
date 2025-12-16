import { useEffect, useState } from "react";
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
      const res = await fetch("http://localhost:4000/api/user/me", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setUserName(data.name);
        setTimelineData(data.timeline || []);
        setDonations(data.donations || []);
        setTotalDonated(data.totalDonated || 0);
        setTotalCount(data.totalCount || 0);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navbar */}
      <DonorNavbar userName={userName} />

      {/* Hero */}
      <section
        className="py-10 text-white"
        style={{
          background:
            "linear-gradient(135deg, hsl(160, 85%, 35%) 0%, hsl(120, 70%, 55%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userName || "Donor"} 👋
          </h1>
          <p className="text-white/80">
            Your generosity is making a difference.
          </p>

          <div className="flex gap-4 mt-6">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`${badge.color} w-14 h-14 rounded-full flex items-center justify-center`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-sm mt-1">{badge.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-8">
            <div className="bg-white/10 px-6 py-4 rounded-lg text-center">
              <div className="text-sm text-white/70">Total Donated</div>
              <div className="text-3xl font-bold">₹{totalDonated}</div>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg text-center">
              <div className="text-sm text-white/70">Donations</div>
              <div className="text-3xl font-bold">{totalCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Timeline */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Your Impact Timeline</h2>
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
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donations */}
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Recent Donation History
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Date</th>
                <th>NGO</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item, i) => (
                <tr key={i} className="border-b">
                  <td>{item.date}</td>
                  <td>{item.ngo}</td>
                  <td>{item.project}</td>
                  <td className="font-medium">{item.amount}</td>
                  <td>
                    <Badge
                      className={
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
