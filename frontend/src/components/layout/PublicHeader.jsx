import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/all-campaigns" },
  { label: "Reports", path: "/reports" },
  { label: "Donors", path: "/donors" },
  { label: "Profile", path: "/profile" },
];

export function PublicHeader({ variant = "dark" }) {
  const location = useLocation();
  const isDark = variant === "dark";

  return (
    <header
      className={
        isDark
          ? "nav-header text-primary-foreground"
          : "bg-card border-b border-border"
      }
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div
            className={`w-8 h-8 ${
              isDark ? "bg-primary-foreground/20" : "bg-accent"
            } rounded-lg flex items-center justify-center`}
          >
            <svg
              className={`w-5 h-5 ${
                isDark ? "text-primary-foreground" : "text-accent-foreground"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <span
            className={`font-semibold text-lg ${
              isDark ? "" : "text-foreground"
            }`}
          >
            NGO Transparent
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? isDark
                    ? "bg-primary-foreground/20"
                    : "text-primary border-b-2 border-primary"
                  : isDark
                  ? "hover:bg-primary-foreground/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Replacing <Button> with <button> but keeping same UI styles */}
        <button className="px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium">
          Donate Now
        </button>
      </div>
    </header>
  );
}
