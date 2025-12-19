import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext"; // assuming you have AuthContext

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/campaigns" },
  {label:"Beneficiaries", path: "/beneficiaries"},
  { label: "Transactions", path: "/transactions" },
  { label: "Donors", path: "/donor-list" },
  { label: "Inventory", path: "/inventory" },
  { label: "Services", path: "/services" },
  // { label: "Help", path: "/help" },

];

export default function DashboardHeader({ title = "TransparifyNGO", subtitle = "" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, checkAuth, setUser } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:4000/api/auth/logout",
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      setUser(null);
      await checkAuth();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="nav-header text-primary-foreground sticky top-0 z-50 w-full m-0 p-0 shadow-sm backdrop-blur-sm bg-primary">
      <div className="flex items-center justify-between px-6 py-3 m-0">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-lg">{title}</span>
              {subtitle && <div className="text-xs text-primary-foreground/70">{subtitle}</div>}
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary-foreground/20"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 w-full text-sm text-primary-foreground hover:bg-primary-foreground/10 rounded-md px-2 py-1"
              onClick={toggleDropdown}
            >
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden md:block">{user?.name || "Admin User"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-md shadow-lg border border-border z-50">
              <Link
                to="/admin-profile"
                className="block px-4 py-2 text-sm hover:bg-blue-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}


          </div>
        </div>
      </div>
    </header>
  );
}
