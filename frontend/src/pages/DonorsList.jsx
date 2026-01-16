import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Search } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import axios from "axios";

/* ---------- Helpers ---------- */
const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "—";
  }
};

export default function DonorsList() {
  const [donors, setDonors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [sortBy, setSortBy] = useState("joinedDesc");

  const API_BASE_URL = "https://transparifyngo.onrender.com/api";

  /* ---------- Fetch donors ---------- */
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/donor/getAllDonors`, {
          withCredentials: true,
        });
        setDonors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  /* ---------- Fetch campaigns ---------- */
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/campaign/ngos/campaigns`, {
          withCredentials: true,
        });
        setCampaigns(res.data || []);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  /* ---------- Filtering & Sorting ---------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let res = donors.filter((d) => {
      const matchesQuery =
        !q ||
        d.name?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q);

      const matchesCampaign =
        !selectedCampaign || d.campaignDonated?.includes(selectedCampaign);

      return matchesQuery && matchesCampaign;
    });

    // Sorting
    if (sortBy === "nameAsc") {
      res.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "donationsDesc") {
      res.sort((a, b) => (b.totalDonated || 0) - (a.totalDonated || 0));
    } else {
      res.sort(
        (a, b) =>
          new Date(b.createdAt.$date || b.createdAt) -
          new Date(a.createdAt.$date || a.createdAt)
      );
    }

    return res;
  }, [donors, query, selectedCampaign, sortBy]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex justify-center items-center">
          <p>Loading donors...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search donors by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-3 py-2 w-full rounded-md border bg-card"
            />
          </div>

          <div className="flex gap-3">
            {/* Campaign Filter */}
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="py-2 px-3 rounded-md border bg-card"
            >
              <option value="">All Campaigns</option>
              {campaigns.map((c) => (
                <option key={c._id} value={c.title}>
                  {c.title} {c.status === "ended" ? "(Ended)" : "(Active)"}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-md border bg-card"
            >
              <option value="joinedDesc">Newest Joined</option>
              <option value="nameAsc">Name (A → Z)</option>
              <option value="donationsDesc">Top Donors</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing <b>{filtered.length}</b> donors
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <div
              key={d._id.$oid || d._id}
              className="bg-card border rounded-lg p-4 flex gap-4 flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">₹{d.totalDonated || 0}</div>
                  <div className="text-xs text-muted-foreground">Total Donated</div>
                </div>
              </div>

              {/* Campaigns */}
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Campaigns:</span>{" "}
                {d.campaignDonated?.length ? d.campaignDonated.join(", ") : "—"}
              </div>

              {/* Financial Details */}
              {d.financialDetails?.length > 0 && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Financial Donations:</span>{" "}
                  {d.financialDetails.map((f) => (
                    <div key={f._id?.$oid || f._id}>
                      {f.campaignName}: ₹{f.amount} on {formatDate(f.date.$date || f.date)}
                    </div>
                  ))}
                </div>
              )}

              {/* In-Kind Details */}
              {d.inKindDetails?.length > 0 && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">In-Kind Donations:</span>{" "}
                  {d.inKindDetails.map((i) => (
                    <div key={i._id?.$oid || i._id}>
                      {i.campaignName}: {i.description} (₹{i.estimatedValue}) on{" "}
                      {formatDate(i.date.$date || i.date)}
                    </div>
                  ))}
                </div>
              )}

              {/* Joined Date and View Button */}
              <div className="mt-3 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Joined {formatDate(d.createdAt.$date || d.createdAt)}
                </div>

                <Link
                  to={`/donor/${d._id.$oid || d._id}`}
                  className="px-3 py-1.5 rounded-md text-sm border hover:bg-primary/5"
                >
                  View
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground bg-card rounded-md">
              No donors found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
