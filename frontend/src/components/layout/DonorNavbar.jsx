import { Link, useLocation } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const DonorNavbar = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("");

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white/30 text-white font-semibold"
      : "hover:bg-white/20 hover:text-white/90";

  // Fetch donor info from backend using JWT cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/me", { withCredentials: true });
        if (res.status === 200) {
          setUserName(res.data.name);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 text-white shadow-md"
      style={{
        background:
          "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-wide">
              Donor Dashboard
            </span>
          </Link>

          {/* CENTER NAV */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <Link
              to="/donor-dashboard"
              className={`px-2 py-1 rounded-md ${isActive("/donor-dashboard")}`}
            >
              Dashboard
            </Link>

            <Link
              to="/all-campaigns"
              className={`px-2 py-1 rounded-md ${isActive("/all-campaigns")}`}
            >
              Explore NGOs
            </Link>

            <Link
              to="/donor-receipts"
              className={`px-2 py-1 rounded-md ${isActive("/donor-receipts")}`}
            >
              My Impact
            </Link>

            <Link
              to="/settings"
              className={`px-2 py-1 rounded-md ${isActive("/settings")}`}
            >
              Settings
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs leading-tight text-white/90">
              <div>Welcome</div>
              <div className="font-medium text-sm">{userName || "Donor"}</div>
            </div>

            <Button className="h-8 px-3 bg-white/20 hover:bg-white/30 text-white text-sm">
              Donate
            </Button>
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden p-2 rounded-md hover:bg-white/20">
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DonorNavbar;
