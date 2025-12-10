// TransactionsList.jsx (with DashboardHeader)
import React from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/layout/DashboardHeader"; 

const rows = [
  {
    donor: "Global Fund for Nature",
    value: "$15,000.00",
    paymentId: "PAY-892103",
    status: "Completed (Financial)",
    receipt: true,
    hash: "0xabc123...",
    date: "Oct 26, 2024",
  },
  {
    donor: "Acme Corp.",
    value: "Computer Equipment ($5,000)",
    paymentId: "INKIND-456789",
    status: "Received (In-Kind)",
    receipt: true,
    hash: "0xdef456...",
    date: "Oct 25, 2024",
  },
  {
    donor: "Anonymous Donor",
    value: "$250.00",
    paymentId: "PAY-987654",
    status: "Pending",
    receipt: false,
    hash: null,
    date: "Oct 24, 2024",
  },
];

// Inline SVG Icons
const EyeIcon = ({ className = "w-5 h-5 inline-block" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronLeftIcon = ({ className = "w-4 h-4 inline-block" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4 inline-block" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TransactionsList() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* TOP DASHBOARD HEADER */}
      <DashboardHeader />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

        <div className="bg-card border rounded-lg mt-4 p-4">
          {/* TABLE */}
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-2 text-left">Donor</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Payment ID</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Receipt</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-3">{r.donor}</td>
                  <td className="px-4 py-3">{r.value}</td>
                  <td className="px-4 py-3">{r.paymentId}</td>
                  <td className="px-4 py-3">{r.status}</td>
                  <td className="px-4 py-3">
                    {r.receipt ? (
                      <a className="text-blue-600 underline cursor-pointer">
                        Download PDF
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3">{r.date}</td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/transactions/details/${r.paymentId}`}
                      className="p-2 rounded-md border hover:bg-muted"
                    >
                      <EyeIcon />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 text-sm">
            <div>Showing 1–6 of 128 items</div>

            <div className="flex items-center gap-2">
              <button className="p-2 border rounded-md">
                <ChevronLeftIcon />
              </button>

              <div className="px-3 py-1 border rounded-md">1</div>

              <button className="p-2 border rounded-md">
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
