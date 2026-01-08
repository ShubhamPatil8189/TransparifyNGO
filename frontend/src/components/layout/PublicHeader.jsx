import { Link } from "react-router-dom";
import { HelpCircle, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicHeader = () => {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">TransparifyNGO</h1>
            <p className="text-xs text-white/80">
              Financial Management & Transparency
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/all-public-compaign"
            className="text-sm text-white/80 hover:text-white"
          >
            Campaigns
          </Link>
          <Link
            to="/about"
            className="text-sm text-white/80 hover:text-white"
          >
            About
          </Link>
          <Link
            to="/transparency"
            className="text-sm text-white/80 hover:text-white"
          >
            Transparency Wall
          </Link>
          <Link
            to="/help"
            className="text-sm text-white/80 hover:text-white"
          >
            Help
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              Admin Login
            </Button>
          </Link>

          <Link to="/donate">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};


/*import { Link } from "react-router-dom";
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

        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            DashBoard
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            About
          </Link>
          <Link
            to="/userhelp"
            className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
          >
            Help
          </Link>
        </nav>
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
*/