import { Link } from "react-router-dom";
import { Shield, Heart, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DonorNavbar from "@/components/layout/DonorNavbar";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const timelineData = [
  { month: "Jan", amount: 500 },
  { month: "Mar", amount: 1000 },
  { month: "Jun", amount: 2500 },
  { month: "Sep", amount: 1500 },
  { month: "Dec", amount: 3000 },
];

const donations = [
  { date: "Dec 15, 2023", ngo: "Clean Water Initiative", project: "Well Drilling in Kenya", amount: "$3,000", status: "Completed" },
  { date: "Nov 20, 2023", ngo: "Education for All", project: "School Supplies", amount: "$500", status: "Completed" },
  { date: "Oct 10, 2023", ngo: "Disaster Relief Fund", project: "Emergency Aid", amount: "$1,000", status: "Completed" },
];

const badges = [
  { icon: Shield, label: "Champion Donor", color: "bg-primary" },
  { icon: Heart, label: "Sustainer", color: "bg-green-500" },
  { icon: Award, label: "Transparency Advocate", color: "bg-primary" },
];

const DonorDashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30">

      {/* Reusable Navbar */}
      <DonorNavbar />

      {/* Hero Section */}
      <section
        className="py-12 text-white"
        style={{
  background: "linear-gradient(135deg, hsl(160, 85%, 35%) 0%, hsl(120, 70%, 55%) 100%)"
}}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-white/80">Your generosity is making a difference.</p>

          <div className="flex items-center gap-8 mt-8">
            <div className="flex gap-4">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`${badge.color} w-16 h-16 rounded-full flex items-center justify-center mb-2`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm text-center">{badge.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 ml-auto">
              <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-lg text-center">
                <div className="text-sm text-white/70">Total Donated</div>
                <div className="text-3xl font-bold">$12,500</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-lg text-center">
                <div className="text-sm text-white/70">Donations</div>
                <div className="text-3xl font-bold">24</div>
              </div>

              {/* <Button variant="outline"
              size="sm"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                Quick Donate
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Impact Timeline */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Your Impact Timeline</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Donation amounts over the past year
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
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

        {/* Recent Donations */}
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Donation History</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">NGO</th>
                <th className="text-left py-3">Project</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4">{item.date}</td>
                  <td className="py-4">{item.ngo}</td>
                  <td className="py-4">{item.project}</td>
                  <td className="py-4 font-medium">{item.amount}</td>
                  <td className="py-4">
                    <Badge className="bg-green-100 text-green-700">Completed</Badge>
                  </td>
                  <td className="py-4">
                    <Button variant="link" className="p-0 text-primary">
                      <Download className="h-4 w-4 inline-block mr-1" />
                      Download PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-muted mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-sm text-muted-foreground">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default DonorDashboard;
