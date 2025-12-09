import { Link } from "react-router-dom";
import { Shield, Heart, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <span className="font-bold text-lg">NGO Transparency Platform</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <Link to="/donor-dashboard" className="px-4 py-2 bg-white/20 rounded-lg">Dashboard</Link>
              <Link to="/all-campaigns" className="hover:text-white/80">Explore NGOs</Link>
              <Link to="/donor-receipts" className="hover:text-white/80">My Impact</Link>
              <Link to="/settings" className="hover:text-white/80">Settings</Link>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm">Welcome,</span>
                <span className="font-medium">Sarah Jenkins</span>
              </div>
            </nav>
          </div>
          
          {/* Hero Section */}
          <div className="py-12">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-white/80">Your generosity is making a difference.</p>
            
            <div className="flex items-center gap-8 mt-8">
              {/* Badges */}
              <div className="flex gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mb-2`}>
                      <badge.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm text-center">{badge.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex gap-4 ml-auto">
                <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-lg text-center">
                  <div className="text-sm text-white/70">Total Donated</div>
                  <div className="text-3xl font-bold">$12,500</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-lg text-center">
                  <div className="text-sm text-white/70">Donations</div>
                  <div className="text-3xl font-bold">24</div>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90 self-center h-12 px-6">
                  Quick Donate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Impact Timeline */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Your Impact Timeline</h2>
          <p className="text-muted-foreground text-sm mb-4">Donation amounts over the past year</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
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
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">NGO</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Project</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4 text-sm">{donation.date}</td>
                  <td className="py-4 text-sm">{donation.ngo}</td>
                  <td className="py-4 text-sm">{donation.project}</td>
                  <td className="py-4 text-sm font-medium">{donation.amount}</td>
                  <td className="py-4">
                    <Badge className="bg-green-100 text-green-700">{donation.status}</Badge>
                  </td>
                  <td className="py-4">
                    <Button variant="link" className="text-primary p-0">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-8 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default DonorDashboard;
