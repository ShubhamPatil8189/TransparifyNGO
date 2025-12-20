import { useEffect, useState } from "react";
import {
  Search,
  Download,
  Eye,
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

const DonorReceipts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/receipts/all", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success) {
          const formattedReceipts = data.receipts.map((r) => ({
            id: r.receipt,
            txnId: r.transactionId || "—",
            date: new Date(r.createdAt).toLocaleDateString(),
            amount:
              r.type === "financial"
                ? "₹ Donation"
                : "In-Kind Donation",
            project:
              r.type === "financial"
                ? "Financial Donation"
                : "In-Kind Donation",
            status: "Verified",
            pdfLink: r.pdfLink,
            verifyUrl: r.verifyUrl,
          }));

          setReceipts(formattedReceipts);
        }
      } catch (error) {
        console.error("Failed to fetch receipts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading receipts...
      </div>
    );
  }

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

            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>

              <SelectContent className="bg-white">
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
              {receipts
                .filter((r) => {
                  const words = searchTerm
                    .toLowerCase()
                    .split(" ")
                    .filter(Boolean);

                  return words.length === 0
                    ? true
                    : words.some(
                        (word) =>
                          r.id?.toLowerCase().includes(word) ||
                          r.project?.toLowerCase().includes(word) ||
                          r.txnId?.toLowerCase().includes(word)
                      );
                })
                .map((r) => (
                  <tr key={r.id} className="border-t hover:bg-muted/40">
                    <td className="px-6 py-4">{r.date}</td>
                    <td className="px-6 py-4 font-medium">{r.id}</td>
                    <td className="px-6 py-4">{r.txnId}</td>
                    <td className="px-6 py-4">{r.amount}</td>
                    <td className="px-6 py-4">{r.project}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">
                        {r.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <a href={r.verifyUrl} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </a>

                      {r.pdfLink ? (
                        <a href={r.pdfLink} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination (UI only) */}
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <span className="text-sm text-muted-foreground">
              Showing {receipts.length} receipts
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
