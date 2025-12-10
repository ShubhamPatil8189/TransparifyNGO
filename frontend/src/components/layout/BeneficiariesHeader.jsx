import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Beneficiaries", path: "/beneficiaries" },
    { icon: Receipt, label: "Transactions", path: "/transactions" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <header
      className="text-white sticky top-0 z-50 shadow-md"
      style={{
        background:
          "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO & ADMIN INFO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="font-semibold text-sm">NA</span>
          </div>
          <div>
            <p className="font-semibold text-sm">NGO Admin</p>
            <p className="text-xs text-white/70">finance.manager@ngo.org</p>
          </div>
        </Link>

        {/* CENTER NAV ITEMS */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT BUTTONS */}
        
        <div className="flex items-center gap-3">
            <Link to='/register'>
          <button className="px-4 py-2 bg-white text-primary font-semibold rounded-md hover:bg-white/90 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Donate Now
          </button>
</Link>
          <Link
            to="/help"
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-white/10 transition"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Link>

          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-white/10 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
