import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Search, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader"; // keep header component

/* ---------- Mock donors data (replace with API call later) ---------- */
const SAMPLE_DONORS = [
  /* ... same sample data as before ... */
  {
    id: "d1",
    firstName: "Asha",
    lastName: "Patel",
    email: "asha.patel@example.com",
    phone: "9876543210",
    ngo: "Save the Children",
    joinedAt: "2024-08-12",
    totalDonations: 1200,
    lastDonation: 200,
  },
  // (include the rest of your SAMPLE_DONORS here)
];

/* ---------- Helpers ---------- */
const uniqueNgos = (arr) => {
  const s = new Set(arr.map((d) => d.ngo).filter(Boolean));
  return Array.from(s);
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

/* ---------- Component ---------- */
export default function DonorsList() {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [ngoFilter, setNgoFilter] = useState("");
  const [sortBy, setSortBy] = useState("joinedDesc"); // joinedDesc, nameAsc, donationsDesc
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const donors = SAMPLE_DONORS;
  const ngos = useMemo(() => uniqueNgos(donors), [donors]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let res = donors.filter((d) => {
      const fullname = `${d.firstName} ${d.lastName}`.toLowerCase();
      return (
        (!q || fullname.includes(q) || (d.email && d.email.toLowerCase().includes(q))) &&
        (!ngoFilter || d.ngo === ngoFilter)
      );
    });

    if (sortBy === "nameAsc") {
      res.sort((a, b) => {
        const an = `${a.firstName} ${a.lastName}`.toLowerCase();
        const bn = `${b.firstName} ${b.lastName}`.toLowerCase();
        return an.localeCompare(bn);
      });
    } else if (sortBy === "donationsDesc") {
      res.sort((a, b) => b.totalDonations - a.totalDonations);
    } else {
      res.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
    }

    return res;
  }, [donors, query, ngoFilter, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                aria-label="Search donors"
                placeholder="Search donors by name or email..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                className="pl-10 pr-3 py-2 w-full rounded-md border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* NGO filter (native select) */}
            <select
              value={ngoFilter}
              onChange={(e) => { setNgoFilter(e.target.value); setPage(1); }}
              className="w-44 py-2 px-3 rounded-md border bg-card text-foreground"
              aria-label="Filter by NGO"
            >
              <option value="">All NGOs</option>
              {ngos.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-44 py-2 px-3 rounded-md border bg-card text-foreground"
              aria-label="Sort donors"
            >
              <option value="joinedDesc">Newest Joined</option>
              <option value="nameAsc">Name (A → Z)</option>
              <option value="donationsDesc">Top Donors</option>
            </select>

            {/* Page size */}
            <select
              value={String(pageSize)}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="w-28 py-2 px-3 rounded-md border bg-card text-foreground"
              aria-label="Donors per page"
            >
              <option value="6">6 / page</option>
              <option value="12">12 / page</option>
              <option value="24">24 / page</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filtered.length}</span> donors
          </div>
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Donor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pageItems.map((d) => (
            <div key={d.id} className="bg-card border rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{d.firstName} {d.lastName}</div>
                    <div className="text-xs text-muted-foreground">{d.email}</div>
                    <div className="text-xs text-muted-foreground">{d.phone}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium">${d.totalDonations}</div>
                    <div className="text-xs text-muted-foreground">Last: ${d.lastDonation}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{d.ngo}</span> • Joined {formatDate(d.joinedAt)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/donor/${d.id}`} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm bg-transparent border border-border hover:bg-primary/5">
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => { window.location.href = `mailto:${d.email}`; }}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm border border-border hover:bg-primary/5"
                    >
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {pageItems.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12 bg-card rounded-md">
              No donors found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center p-2 rounded-md border border-border hover:bg-primary/5 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const isActive = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center p-2 rounded-md border border-border hover:bg-primary/5 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
