import { Link } from "react-router-dom";
import { HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicHeader = () => {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
        position: "sticky",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto text-white">
        {/* left: logo + title */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-lg">TransparifyNGO</h1>
            <div className="text-xs text-white/80">
              Financial Management & Transparency
            </div>
          </div>
        </Link>

        {/* center: nav (hidden on small) */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/dashboard"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            to="/all-campaigns"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            Campaigns
          </Link>
          <Link
            to="/donor-list"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            Donors
          </Link>
          <Link
            to="/reports"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            Reports
          </Link>
        </nav>

        {/* right: search (small icon), support */}
        <div className="flex items-center gap-3">
          <button
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/12 text-white text-sm"
            aria-label="search"
            type="button"
          >
            <Search className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Search</span>
          </button>

          <Link to="/help">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Support
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
