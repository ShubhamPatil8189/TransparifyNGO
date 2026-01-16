// TransactionsList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/layout/DashboardHeader";

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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://transparifyngo.onrender.com/api/transactions/all")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const calculateTotalValue = (items) =>
    items.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

        <div className="bg-card border rounded-lg mt-4 p-4">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading transactions...
            </div>
          ) : (
            <>
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
                  {transactions.map((t) => {
                    const totalValue = calculateTotalValue(t.items);
                    const valueText = `₹${totalValue} (In-kind)`;

                    return (
                      <tr key={t._id} className="border-b">
                        <td className="px-4 py-3">{t.donor?.name}</td>

                        <td className="px-4 py-3">{valueText}</td>

                        <td className="px-4 py-3">{t.receipt}</td>

                        <td className="px-4 py-3">Received (In-kind)</td>

                        <td className="px-4 py-3">
                          <a
                         
                            href={`https://transparifyngo.onrender.com/api/transactions/${t.receipt}/receipt`}
                            target="_blank"
                            className="text-blue-600 underline cursor-pointer"
                          >
                            Download PDF
                          </a>
                        </td>

                        <td className="px-4 py-3">{formatDate(t.createdAt)}</td>

                        <td className="px-4 py-3 text-center">
                          <Link
                            to={`/transactions/details/${t._id}`}
                            className="p-2 rounded-md border hover:bg-muted"
                          >
                            <EyeIcon />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* PAGINATION (static for now) */}
              <div className="flex items-center justify-between px-6 py-4 text-sm">
                <div>
                  Showing {transactions.length} of {transactions.length} items
                </div>

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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
