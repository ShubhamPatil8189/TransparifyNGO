// src/pages/DonorDetailsDashboard.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * DonorDetailsDashboard (full file)
 * - Top navbar uses inline gradient: linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)
 * - No external CSS changes required
 * - Uses Link + useLocation for navigation and active state
 */

export default function DonarDetailsDashBoard() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const tasks = [
    {
      title: "Distribute food kits in North Suburb",
      priority: "High Priority",
      due: "Tomorrow, 5 PM",
    },
    {
      title: "Verify 5 new beneficiary applications",
      priority: "Medium Priority",
      due: "In 3 days",
    },
    {
      title: "Conduct inventory count for medical supplies",
      priority: "Low Priority",
      due: "Next Monday",
    },
  ];

  const inventory = [
    { label: "Food Kits", value: 85, max: 100, colorClass: "bg-blue-600" },
    { label: "Medical Supplies", value: 40, max: 100, colorClass: "bg-amber-500" },
    { label: "Blankets", value: 180, max: 200, colorClass: "bg-sky-600" },
  ];

  const activities = [
    { icon: "✅", text: "You logged a distribution of 20 food kits.", time: "2 hours ago" },
    { icon: "👤", text: "Beneficiary #BN-7892 was verified.", time: "5 hours ago" },
    { icon: "📋", text: 'Task "Downtown Shelter Check-in" marked as complete.', time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      {/* NAVBAR - inline gradient (exact requested) */}
      <nav
        className="text-white border-b border-border sticky top-0 z-50"
        style={{
          background:
            "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* left: logo + title */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center text-white font-bold">
                  NG
                </div>
                <div className="hidden sm:block">
                  <div className="font-semibold text-white">TransparifyNGO</div>
                </div>
              </Link>
            </div>

            {/* center: nav links (horizontal) */}
            {/* <div className="hidden md:flex md:items-center md:space-x-1">
              <NavLink2 to="/dashboard" active={isActive("/dashboard")}>Dashboard</NavLink2>
              <NavLink2 to="/tasks" active={isActive("/tasks")}>Tasks</NavLink2>
              <NavLink2 to="/inventory" active={isActive("/inventory")}>Inventory</NavLink2>
              <NavLink2 to="/reports" active={isActive("/reports")}>Reports</NavLink2>
              <NavLink2 to="/transactions" active={isActive("/transactions")}>Transactions</NavLink2>
            </div> */}

            {/* right: actions + avatar */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/donation">
                  <button className="inline-flex items-center gap-2 bg-white text-blue-700 px-3 py-2 rounded-lg shadow text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Log Distribution
                  </button>
                </Link>

                <button className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-sm text-white">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="14" rx="2" strokeWidth="1.5" />
                  </svg>
                  Request Supplies
                </button>
              </div>

              {/* small divider */}
              <div className="h-6 w-px bg-white/30 hidden sm:block" />

              {/* avatar + user menu link */}
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden sm:block text-sm text-white">
                  <div className="font-medium">Maria Garcia</div>
                  <div className="text-xs opacity-80">Volunteer</div>
                </div>
              </div>

              {/* mobile menu button */}
              <div className="md:hidden">
                <MobileNavToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav - appears below on small screens */}
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NavLink2 to="/dashboard" active={isActive("/dashboard")}>Dashboard</NavLink2>
              <NavLink2 to="/tasks" active={isActive("/tasks")}>Tasks</NavLink2>
            </div>
            <div className="flex items-center gap-2">
              <NavLink2 to="/inventory" active={isActive("/inventory")}>Inventory</NavLink2>
              <NavLink2 to="/reports" active={isActive("/reports")}>Reports</NavLink2>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN GRID */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, Maria!</h1>
              <p className="text-slate-500 mt-1">Here’s what’s on your plate for today.</p>
              <div className="flex items-center gap-3 mt-6">
                <Link to="/donor-login">
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Donate Now
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
                    <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="14" rx="2" strokeWidth="1.5" />
                    </svg>
                    GO To DashBoard
                  </button>
                </Link>
              </div>
            </div>

            {/* Right column: inventory + recent activity */}
            <div className="w-80 space-y-4 hidden lg:block">
              <div className="bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Inventory Snapshot</div>
                  <Link to="/inventory" className="text-sm text-blue-600">
                    View All
                  </Link>
                </div>

                <div className="mt-3 space-y-3">
                  {inventory.map((it, idx) => {
                    const percent = Math.round((it.value / it.max) * 100);
                    return (
                      <div key={idx}>
                        <div className="flex justify-between text-sm text-slate-600">
                          <div>{it.label}</div>
                          <div>{it.value} / {it.max}</div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
                          <div className={`${it.colorClass} h-2`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-4">
                <div className="font-semibold">Recent Activity</div>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  {activities.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">{a.icon}</div>
                      <div>
                        <div className="text-sm">{a.text}</div>
                        <div className="text-xs text-slate-400">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content area: Tasks card */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">My Tasks</h2>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-full bg-slate-100 text-sm">All</button>
                    <button className="px-3 py-1 rounded-full text-sm">High Priority</button>
                    <button className="px-3 py-1 rounded-full text-sm">Due Soon</button>
                  </div>
                </div>

                <div className="mt-4 divide-y">
                  {tasks.map((t, i) => (
                    <div key={i} className="py-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${t.priority === 'High Priority' ? 'bg-red-100 text-red-700' : t.priority === 'Medium Priority' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                            {t.priority}
                          </span>
                          <div className="text-sm font-medium">{t.title}</div>
                        </div>

                        <div className="text-xs text-slate-400 mt-2">Due: {t.due}</div>
                      </div>

                      <Link to="/tasks" className="text-sm text-blue-600">View Details</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column quick links + notifications */}
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-lg p-4">
                <h3 className="font-semibold">Quick Links</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <Link to="/donor-list" className="block text-blue-600">Donor List</Link>
                  <Link to="/campaigns" className="block text-blue-600">Campaigns</Link>
                  <Link to="/reports" className="block text-blue-600">Generate Report</Link>
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-4">
                <h3 className="font-semibold">Notifications</h3>
                <div className="mt-3 text-sm text-slate-600">No new notifications.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Small helper components
   ------------------------- */

function NavLink2({ to, children, active }) {
  return (
    <Link
      to={to}
      className={
        "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
        (active
          ? "bg-white/20 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white")
      }
    >
      {children}
    </Link>
  );
}

function MobileNavToggle() {
  // Placeholder: you can add an actual mobile menu toggle + panel if desired
  return (
    <button className="p-2 rounded-md bg-white/10 border border-white/20 text-white">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
