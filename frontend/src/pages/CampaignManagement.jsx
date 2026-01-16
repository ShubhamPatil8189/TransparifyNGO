import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Footer } from "@/components/layout/Footer";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { toast } from "sonner";

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          "https://transparifyngo.onrender.com/api/campaign/ngos/campaigns",
          { withCredentials: true }
        );
        setCampaigns(res.data);
      } catch (err) {
        console.error("Fetch campaigns failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const campaignStatus = c.status.toLowerCase();
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? campaignStatus === "active"
        : campaignStatus === "ended";

    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      await axios.delete(`https://transparifyngo.onrender.com/api/campaign/${id}`, {
        withCredentials: true,
      });
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
      toast.success("Campaign deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete campaign");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Campaign Management</h1>
          <Link to="/campaigns/create">
            <Button>Create New Campaign</Button>
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
              variant={filter === "ended" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("ended")}
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
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading campaigns...
                  </TableCell>
                </TableRow>
              )}

              {!loading && filteredCampaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No campaigns found
                  </TableCell>
                </TableRow>
              )}

              {filteredCampaigns.map((c) => {
                const percentage = Math.round(
                  (c.collectedAmount / c.goalAmount) * 100
                );

                return (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell className="capitalize">{c.status}</TableCell>
                    <TableCell>₹{c.goalAmount.toLocaleString()}</TableCell>
                    <TableCell>₹{c.collectedAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs">{percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(c.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(c.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                    <div className="flex gap-1 relative">
                      {/* Navigate to campaign details */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/campaign/${c._id}`)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>

                      {/* Dropdown Menu */}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCampaigns((prev) =>
                              prev.map((item) =>
                                item._id === c._id
                                  ? { ...item, showMenu: !item.showMenu }
                                  : { ...item, showMenu: false }
                              )
                            )
                          }
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>

                        {c.showMenu && (
                          <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded shadow-lg z-10">
                            <button
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted rounded"
                              onClick={() => handleDelete(c._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
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
