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
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Beneficiaries", path: "/beneficiaries" },
  { icon: Receipt, label: "Transactions", path: "/transactions" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Brain, label: "AI Insights", path: "/ai-analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
            <span className="text-success-foreground font-semibold text-sm">NA</span>
          </div>
          <div>
            <p className="font-semibold text-sm">NGO Admin</p>
            <p className="text-xs text-muted-foreground">finance.manager@ngo.org</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-border">
        <Button className="w-full bg-primary hover:bg-primary/90">
          <Heart className="w-4 h-4 mr-2" />
          Donate Now
        </Button>
        <Link
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          Help
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
