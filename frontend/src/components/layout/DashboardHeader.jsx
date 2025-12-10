import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/campaigns" },
  { label: "Transactions", path: "/transactions" },
  { label: "Donors", path: "/donor-list" },
  { label: "Reports", path: "/home" },
  { label: "Services", path: "/services" },
];

export default function DashboardHeader({ title = "TransparifyNGO", subtitle = "" }) {
  const location = useLocation();

  return (
    <header className="nav-header text-primary-foreground sticky top-0 z-50 w-full m-0 p-0 shadow-sm backdrop-blur-sm bg-primary">
      {/* KEEP ALL YOUR COLORS HERE — only removed unwanted margins */}
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
              {subtitle && (
                <div className="text-xs text-primary-foreground/70">{subtitle}</div>
              )}
            </div>
          </Link>

          {/* NAV LINKS */}
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

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-4">
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

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden md:block text-sm">Admin User</span>
          </div>

          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
