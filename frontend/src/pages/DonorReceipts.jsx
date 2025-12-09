import { useState } from "react";
import { Search, Download, Eye, CheckCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

const receipts = [
  { id: "REC-948521", txnId: "TXN-1029384", date: "Oct 25, 2023", amount: "$250.00", project: "Clean Water Initiative", status: "Verified" },
  { id: "REC-948520", txnId: "TXN-1029383", date: "Oct 25, 2023", amount: "$50.00", project: "Education Fund", status: "Pending" },
  { id: "REC-948519", txnId: "TXN-1029383", date: "Sep 12, 2023", amount: "$250.00", project: "Clean Water Initiative", status: "Verified" },
  { id: "REC-948518", txnId: "TXN-1029383", date: "Sep 12, 2023", amount: "$50.00", project: "Education Fund", status: "Pending" },
  { id: "REC-948517", txnId: "TXN-1029387", date: "Sep 12, 2023", amount: "$100.00", project: "Clean Water Initiative", status: "Verified" },
  { id: "REC-948516", txnId: "TXN-1029386", date: "Sep 12, 2023", amount: "$250.00", project: "Clean Water Initiative", status: "Verified" },
  { id: "REC-948521", txnId: "TXN-1029385", date: "Sep 12, 2023", amount: "$50.00", project: "Education Fund", status: "Pending" },
  { id: "REC-948521", txnId: "TXN-1029384", date: "Sep 12, 2023", amount: "$250.00", project: "Clean Water Initiative", status: "Verified" },
  { id: "REC-948520", txnId: "TXN-1029383", date: "Sep 12, 2023", amount: "$50.00", project: "Education Fund", status: "Pending" },
];

const DonorReceipts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Donor Receipts</h1>
        
        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            <Select defaultValue="6months">
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="water">Clean Water Initiative</SelectItem>
                <SelectItem value="education">Education Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-primary">
            <Download className="h-4 w-4 mr-2" />
            Export All Receipts
          </Button>
        </div>
        
        {/* Table */}
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Receipt ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Project</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {receipts.map((receipt, index) => (
                <tr key={index} className="hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{receipt.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{receipt.id}</td>
                  <td className="px-6 py-4 text-sm">{receipt.txnId}</td>
                  <td className="px-6 py-4 text-sm font-medium">{receipt.amount}</td>
                  <td className="px-6 py-4 text-sm">{receipt.project}</td>
                  <td className="px-6 py-4">
                    <Badge variant={receipt.status === "Verified" ? "default" : "secondary"} className={receipt.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                      {receipt.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" className="bg-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verify
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <span className="text-sm text-muted-foreground">Page 1 of 5</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button size="sm" className="bg-primary">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorReceipts;
