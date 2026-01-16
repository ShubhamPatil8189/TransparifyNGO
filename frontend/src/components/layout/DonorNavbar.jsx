import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  User,
  LogOut,
  Gift,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const DonorNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userInitial =
    !loading && user?.user?.name
      ? user.user.name.charAt(0).toUpperCase()
      : null;

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white/30 text-white font-semibold"
      : "hover:bg-white/20 hover:text-white/90";

  const handleLogout = async () => {
    try {
      await axios.get("https://transparifyngo.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/donor-login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
          {/* LOGO */}
          <Link to="/donor-dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-wide">
              Donor Dashboard
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {[
              ["/donor-dashboard", "Dashboard"],
              ["/donor-receipts", "My Receipts"],
              ["/donar-donation", "Donation"],
              ["/shop", "Shop"],
              ["/my-orders", "My Orders"],
              ["/userhelp", "Help"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`px-2 py-1 rounded-md ${isActive(path)}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4 relative">
            <Button
              onClick={() => navigate("/donate")}
              className="h-8 px-3 bg-white/20 hover:bg-white/30 text-white text-sm"
            >
              <Gift className="h-4 w-4 mr-1" />
              Donate
            </Button>

            {/* AVATAR */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-white/30 font-bold text-sm flex items-center justify-center"
            >
              {userInitial || <User className="h-4 w-4" />}
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/donor-profile");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/my-orders");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  My Orders
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500 border-t"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/20"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-2 text-sm">
            {[
              ["/donor-dashboard", "Dashboard"],
              ["/donor-receipts", "My Receipts"],
              ["/donar-donation", "Donation"],
              ["/shop", "Shop"],
              ["/my-orders", "My Orders"],
              ["/userhelp", "Help"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className="block px-3 py-2 rounded-md hover:bg-white/20"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/20 space-y-2">
              <Button
                onClick={() => {
                  navigate("/donate");
                  setMobileOpen(false);
                }}
                className="w-full bg-white/20 hover:bg-white/30"
              >
                <Gift className="h-4 w-4 mr-2" />
                Donate
              </Button>

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DonorNavbar;
