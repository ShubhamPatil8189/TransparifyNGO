import { useState } from "react";
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DonorNavbar from "@/components/layout/DonorNavbar";

const receipts = [
  {
    id: "REC-948521",
    txnId: "TXN-1029384",
    date: "Oct 25, 2023",
    amount: "$250.00",
    project: "Clean Water Initiative",
    status: "Verified",
  },
  {
    id: "REC-948520",
    txnId: "TXN-1029383",
    date: "Oct 25, 2023",
    amount: "$50.00",
    project: "Education Fund",
    status: "Pending",
  },
  {
    id: "REC-948519",
    txnId: "TXN-1029383",
    date: "Sep 12, 2023",
    amount: "$250.00",
    project: "Clean Water Initiative",
    status: "Verified",
  },
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
      <DonorNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Donor Receipts</h1>

        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-6 flex flex-wrap gap-4 justify-between">
          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search receipts..."
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          </div>

          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Receipts
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Receipt ID</th>
                <th className="px-6 py-4 text-left">Transaction</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Project</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {receipts.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/40">
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4 font-medium">{r.id}</td>
                  <td className="px-6 py-4">{r.txnId}</td>
                  <td className="px-6 py-4">{r.amount}</td>
                  <td className="px-6 py-4">{r.project}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        r.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link to={`/verify/${r.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </Link>

                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>

                    <Button size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <span className="text-sm text-muted-foreground">
              Page 1 of 5
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button size="sm">
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
