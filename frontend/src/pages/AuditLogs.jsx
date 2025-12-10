import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Filter, Calendar, Download, Bell, HelpCircle, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Transactions", path: "/transactions" },
  { label: "Donors", path: "/donor-list" },
  { label: "Reports", path: "/reports" },
  { label: "Audit Logs", path: "/audit-logs", active: true },
];

const logs = [
  {
    timestamp: "2023-10-27 14:30:15 UTC",
    user: "admin@example.org",
    action: "Transaction Created",
    resource: "Donation #12345",
    hash: "a1b2c3d4...",
    actionType: "create",
  },
  {
    timestamp: "2023-10-27 14:25:10 UTC",
    user: "jane.doe@example.org",
    action: "User Role Updated",
    resource: "User #678",
    hash: "e5f6g7h8...",
    actionType: "update",
  },
  {
    timestamp: "2023-10-27 14:20:05 UTC",
    user: "admin@example.org",
    action: "Report Generated",
    resource: "Monthly Financials",
    hash: "i9j0k1l2...",
    actionType: "report",
  },
  {
    timestamp: "2023-10-27 14:15:50 UTC",
    user: "john.smith@example.org",
    action: "Donation Deleted",
    resource: "Donation #12344",
    hash: "m3n4o5p6...",
    actionType: "delete",
  },
  {
    timestamp: "2023-10-27 14:10:30 UTC",
    user: "admin@example.org",
    action: "Settings Updated",
    resource: "System Configuration",
    hash: "q7r8s9t0...",
    actionType: "settings",
  },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const getActionStyle = (actionType) => {
    switch (actionType) {
      case "create":
        return "bg-primary/10 text-primary border border-primary/20";
      case "update":
        return "bg-warning/10 text-warning border border-warning/20";
      case "delete":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      case "report":
        return "bg-success/10 text-success border border-success/20";
      case "settings":
        return "bg-muted text-muted-foreground border border-border";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ⭐ NEW GRADIENT HEADER (same as Dashboard) */}
      <header
        className="sticky top-0 z-50"
        style={{
          background:
            "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 text-white">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">NGO Finance</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/help">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                Help
              </Button>
            </Link>

            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10">
              <Bell className="w-5 h-5 text-white" />
            </button>

            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Audit Logs</h1>
          </div>
          <p className="text-muted-foreground">
            An immutable record of all system activities for transparency and accountability.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>

          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" /> Date Range
          </Button>

          <div className="flex-1" />

          <Button className="bg-primary">
            <Download className="w-4 h-4 mr-2" /> Export Logs
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Hash</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.user}</TableCell>

                  <TableCell>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getActionStyle(
                        log.actionType
                      )}`}
                    >
                      {log.action}
                    </span>
                  </TableCell>

                  <TableCell className="text-sm">{log.resource}</TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">{log.hash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" size="icon" disabled>‹</Button>
          <Button size="sm" className="bg-primary">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">10</Button>
          <Button variant="outline" size="icon">›</Button>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 NGO Finance. | 
        <Link to="/support" className="text-primary hover:underline ml-1">Support</Link>
      </footer>
    </div>
  );
}
