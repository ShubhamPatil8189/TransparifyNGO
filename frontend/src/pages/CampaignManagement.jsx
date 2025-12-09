import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ExternalLink, Eye, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Footer } from "@/components/layout/Footer";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/campaigns", active: true },
  { label: "Donors", path: "/donors" },
  { label: "Financials", path: "/financials" },
  { label: "Reports", path: "/reports" },
];

const campaigns = [
  {
    name: "Clean Water for All",
    status: "Active",
    goal: 50000,
    collected: 35200,
    startDate: "Jan 15, 2024",
    endDate: "Dec 31, 2024",
  },
  {
    name: "Education Fund 2023",
    status: "Ended",
    goal: 25000,
    collected: 25000,
    startDate: "Mar 1, 2023",
    endDate: "Dec 31, 2023",
  },
  {
    name: "Disaster Relief Initiative",
    status: "Active",
    goal: 100000,
    collected: 12500,
    startDate: "May 10, 2024",
    endDate: "Nov 10, 2024",
  },
  {
    name: "Community Health Clinic",
    status: "Active",
    goal: 75000,
    collected: 45000,
    startDate: "Feb 1, 2024",
    endDate: "Oct 1, 2024",
  },
];

export default function CampaignManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-primary">TransparencyLink</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm">Admin User</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Campaign Management</h1>
          <Link to="/campaigns/create">
            <Button className="bg-primary">Create New Campaign</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={filter === "past" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("past")}
            >
              Past
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Collected</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign, index) => {
                const percentage = Math.round((campaign.collected / campaign.goal) * 100);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <span className={`status-badge ${campaign.status === "Active" ? "status-active" : "status-ended"}`}>
                        {campaign.status}
                      </span>
                    </TableCell>
                    <TableCell>${campaign.goal.toLocaleString()}</TableCell>
                    <TableCell>${campaign.collected.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${percentage >= 100 ? "bg-success" : "bg-primary"}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{campaign.startDate}</TableCell>
                    <TableCell className="text-sm">{campaign.endDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
