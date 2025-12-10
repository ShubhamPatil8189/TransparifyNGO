import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Calendar, Eye, Upload, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import  DashboardHeader  from "@/components/layout/DashboardHeader";

const inventoryItems = [
  { id: 1, name: "50kg Rice Sacks", category: "Food & Nutrition", donor: "World Food Programme", value: "$2,500", date: "2024-01-15", status: "Available" },
  { id: 2, name: "Laptop Computers (Dell Latitude)", category: "Technology", donor: "Microsoft Philanthropies", value: "$15,000", date: "2023-11-20", status: "Available" },
  { id: 3, name: "Winter Blankets (Wool)", category: "Shelter & Warmth", donor: "Red Cross", value: "$4,000", date: "2023-12-05", status: "Distributed" },
  { id: 4, name: "Medical Kits (Basic)", category: "Health", donor: "Doctors Without Borders", value: "$8,500", date: "2024-02-10", status: "Available" },
  { id: 5, name: "Educational Tablets", category: "Education", donor: "Google.org", value: "$12,000", date: "2023-10-25", status: "Distributed" },
];

const InKindInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          {" > "}
          <Link to="/transactions" className="hover:text-foreground">Transactions</Link>
          {" > "}
          <span className="hover:text-foreground">Inventory</span>
          {" > "}
          <span className="text-foreground font-medium">In-Kind Inventory</span>
        </nav>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">In-Kind Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage and track all donated items, their value, and distribution status.</p>
        </div>
        
        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by item, donor, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-72"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Nutrition</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-36">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Donor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Donors</SelectItem>
                <SelectItem value="wfp">World Food Programme</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Link to="/inventory/add">
            <Button className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </Link>
        </div>
        
        {/* Table */}
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="w-12 px-4 py-4">
                  <Checkbox />
                </th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Item Name</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Donor</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Estimated Value</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Received Date</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30">
                  <td className="px-4 py-4">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">{item.name}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-4 text-sm">{item.donor}</td>
                  <td className="px-4 py-4 text-sm font-medium">{item.value}</td>
                  <td className="px-4 py-4 text-sm">{item.date}</td>
                  <td className="px-4 py-4">
                    <Badge className={item.status === "Available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {item.status === "Available" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark Distributed
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload Proof
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Proof
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <span className="text-sm text-muted-foreground">Showing 1-10 of 45 items</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InKindInventory;
