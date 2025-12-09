import { useState } from "react";
import { Search, Eye, Pencil, Copy, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const beneficiaries = [
  {
    id: "#BN - 00754",
    name: "Jane Doe",
    program: "Food Security",
    status: "Active",
    dateAdded: "2023-03-15",
  },
  {
    id: "#BN - 00753",
    name: "John Smith",
    program: "Education Support",
    status: "Active",
    dateAdded: "2023-03-12",
  },
  {
    id: "#BN - 00752",
    name: "Maria Garcia",
    program: "Healthcare Access",
    status: "Inactive",
    dateAdded: "2023-02-28",
  },
];

export default function Beneficiaries() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          Home / <span className="text-foreground">Beneficiaries</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Beneficiary Management</h1>
            <p className="text-muted-foreground">
              Track, manage, and view distribution history for all beneficiaries.
            </p>
          </div>
          <Button className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New Beneficiary
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Program: All</SelectItem>
              <SelectItem value="food">Food Security</SelectItem>
              <SelectItem value="education">Education Support</SelectItem>
              <SelectItem value="healthcare">Healthcare Access</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Location: All</SelectItem>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>BENEFICIARY ID</TableHead>
                <TableHead>FULL NAME</TableHead>
                <TableHead>PROGRAM</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>DATE ADDED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{beneficiary.id}</TableCell>
                  <TableCell className="font-medium">{beneficiary.name}</TableCell>
                  <TableCell className="text-sm">{beneficiary.program}</TableCell>
                  <TableCell>
                    <span className={`status-badge ${beneficiary.status === "Active" ? "status-active" : "status-inactive"}`}>
                      {beneficiary.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{beneficiary.dateAdded}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Table Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Bulk Actions</Button>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 10</span>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
