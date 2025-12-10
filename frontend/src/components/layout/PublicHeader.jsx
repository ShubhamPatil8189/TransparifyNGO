import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

// Navigation items
const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/all-campaigns" },
  { label: "Reports", path: "/reports" },
  { label: "Donors", path: "/donor-list" },
  { label: "Profile", path: "/profile" },
  { label: "About", path: "/about" },

];

// ⭐ ONLY NAMED EXPORT — matches your import line
export function PublicHeader() {
  const location = useLocation();

  return (
    <header
      className="text-primary-foreground"
      style={{
        background:
          "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div>
              <span className="font-semibold text-lg">TransparifyNGO</span>
              <div className="text-xs text-primary-foreground/70">
                Public Portal
              </div>
            </div>
          </Link>

          {/* Navigation links */}
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

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/70" />
            <input
              placeholder="Search"
              className="pl-10 w-64 h-10 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          {/* Bell icon */}
          <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-primary-foreground/10">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </button>

          {/* User Icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="hidden md:block text-sm">Guest User</span>
          </div>

          {/* CTA Button */}
          <Link to="/register">
            <button className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white/20">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}


// import { Link, useLocation } from "react-router-dom";

// const navItems = [
//   { label: "Dashboard", path: "/dashboard" },
//   { label: "Campaigns", path: "/all-campaigns" },
//   { label: "Reports", path: "/reports" },
//   { label: "Donors", path: "/donor-list" },
//   { label: "Profile", path: "/profile" },
// ];

// export function PublicHeader({ variant = "dark" }) {
//   const location = useLocation();
//   const isDark = variant === "dark";

//   return (
//     <header
//       // sticky + top + z-index so header stays above content
//       className={
//         (isDark
//           ? "nav-header text-primary-foreground"
//           : "bg-card border-b border-border") +
//         " sticky top-0 z-50 backdrop-filter backdrop-blur-sm shadow-sm"
//       }
//     >
//       <div className="flex items-center justify-between px-6 py-4">
//         <Link to="/" className="flex items-center gap-2">
//           <div
//             className={`w-8 h-8 ${
//               isDark ? "bg-primary-foreground/20" : "bg-accent"
//             } rounded-lg flex items-center justify-center`}
//           >
//             <svg
//               className={`w-5 h-5 ${
//                 isDark ? "text-primary-foreground" : "text-accent-foreground"
//               }`}
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//             </svg>
//           </div>

//           <span
//             className={`font-semibold text-lg ${isDark ? "" : "text-foreground"}`}
//           >
//             NGO Transparent
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-1">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 location.pathname === item.path
//                   ? isDark
//                     ? "bg-primary-foreground/20"
//                     : "text-primary border-b-2 border-primary"
//                   : isDark
//                   ? "hover:bg-primary-foreground/10"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Replacing <Button> with <button> but keeping same UI styles */}
//         <button className="px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium">
//           Donate Now
//         </button>
//       </div>
//     </header>
//   );
// }
