import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, Receipt, Link2, Download, Bell, HelpCircle, Search, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Transactions" },
  { icon: Receipt, label: "Receipts" },
  { icon: Link2, label: "Hash Chain" },
];

const barData = [
  { month: "1990", income: 600, expense: 400 },
  { month: "0000", income: 500, expense: 350 },
  { month: "0J00", income: 700, expense: 500 },
  { month: "0000", income: 450, expense: 300 },
  { month: "8000", income: 800, expense: 600 },
  { month: "20:00", income: 650, expense: 450 },
];

const pieData = [
  { name: "Program A", value: 45, color: "#1e40af" },
  { name: "Program B", value: 30, color: "#16a34a" },
  { name: "Administration", value: 15, color: "#fbbf24" },
  { name: "Fundraising", value: 10, color: "#e5e7eb" },
];

const transactions = [
  { id: "TXN-8A7BA06F", date: "2023-10-26", type: "Income", category: "Corporate Donation", amount: "$5,000.00" },
  { id: "TXN-C3F8A1B9", date: "2023-10-25", type: "Expense", category: "Office Supplies", amount: "-$250.75" },
  { id: "TXN-9D6E7F3A", date: "2023-10-24", type: "Expense", category: "Program A: Materials", amount: "-$1,230.00" },
  { id: "TXN-4B6CB81F", date: "2023-10-23", type: "Income", category: "Individual Donation", amount: "$100.00" },
];

const AuditorDashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground font-bold">N</span>
            </div>
            <div>
              <h1 className="font-bold">NGO Financial</h1>
              <p className="text-xs text-primary-foreground/70">Management</p>
              <p className="text-xs text-primary-foreground/70">Transparency Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to="#"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                item.active ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Auditor Dashboard</h1>
            <Badge className="bg-yellow-100 text-yellow-700">Read-Only Mode</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <HelpCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full" />
              <div>
                <p className="text-sm font-medium">Alex Hartman</p>
                <p className="text-xs text-muted-foreground">Auditor</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-card rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Donations</p>
              <p className="text-2xl font-bold">$1,250,430</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% vs last period
              </p>
            </div>
            <div className="bg-card rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Expenditures</p>
              <p className="text-2xl font-bold">$875,120</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1% vs last period
              </p>
            </div>
            <div className="bg-card rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-1">Number of Transactions</p>
              <p className="text-2xl font-bold">15,890</p>
              <p className="text-xs text-green-600 mt-1">+120 this month</p>
            </div>
            <div className="bg-card rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-1">Current Funds</p>
              <p className="text-2xl font-bold">$375,310</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.1% vs last period
              </p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">Income vs. Expenditure</h3>
                  <p className="text-2xl font-bold">$375,310 <span className="text-sm font-normal text-muted-foreground">Net Balance</span></p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Fund Allocation by Category</h3>
                <span className="text-sm text-muted-foreground">All Time</span>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">All Transactions</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-9 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" className="w-40" />
              </div>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Transaction ID</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Date</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Category</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Amount</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 text-sm font-mono">{txn.id}</td>
                    <td className="py-3 text-sm">{txn.date}</td>
                    <td className="py-3">
                      <Badge className={txn.type === "Income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                        {txn.type}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm">{txn.category}</td>
                    <td className="py-3 text-sm font-medium">{txn.amount}</td>
                    <td className="py-3">
                      <Button variant="link" className="text-primary p-0">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Showing 1 to 4 of 15,890 entries</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>{"<"}</Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="outline" size="sm">3873</Button>
                <Button variant="outline" size="sm">{">"}</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuditorDashboard;
