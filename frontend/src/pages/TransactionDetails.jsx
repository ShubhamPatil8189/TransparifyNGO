// TransactionDetails.jsx
import DashboardHeader from "@/components/layout/DashboardHeader";
import React from "react";
import { Link } from "react-router-dom";

const GOOGLE_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png";

const DONOR_IMG =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500";

// Inline icons
const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01 9 11.01" />
  </svg>
);

const DocumentArrowDownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function TransactionDetails() {
  
  const transaction = {
    id: "TX-2024-04521",
    project: "Clean Water for All",
    status: "Completed",
    date: "October 24, 2024",
    amount: "$5,000.00 USD",
    currentHash: "8f2d9a4b7c1e5f6d3a0b2cc9d8e7f1q0h",
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ⭐ NEW GRADIENT HEADER (Dashboard Style) */}
     

          <DashboardHeader/>

      {/* MAIN CONTENT */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-4">

          {/* Summary Box */}
          <div className="bg-white p-5 border rounded-lg">
            <div className="flex flex-col md:flex-row justify-between gap-4">

              <div>
                <div className="text-xs text-slate-500">
                  Home → Transactions → <span className="font-medium">#{transaction.id}</span>
                </div>
                <h2 className="text-xl font-bold mt-2">Transaction Details: #{transaction.id}</h2>
                <div className="text-sm text-slate-600 mt-1">Project: {transaction.project}</div>
              </div>

              <div className="flex gap-3">
                <div className="bg-slate-50 border rounded-md p-3 text-center min-w-[130px]">
                  <div className="text-xs text-slate-500">Status</div>
                  <div className="text-green-700 font-semibold mt-1">{transaction.status}</div>
                </div>

                <div className="bg-slate-50 border rounded-md p-3 text-center min-w-[130px]">
                  <div className="text-xs text-slate-500">Date</div>
                  <div className="font-medium mt-1">{transaction.date}</div>
                  <div className="text-xs text-slate-500 mt-2">Amount</div>
                  <div className="font-semibold mt-1">{transaction.amount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Section */}
          <div className="bg-white p-5 border rounded-lg">
            <h3 className="font-semibold mb-3">Audit Trail & Integrity</h3>

            <div className="md:flex gap-6">
              <div className="flex-1">
                <div className="h-28 rounded-md border bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-center text-slate-400">
                  [blockchain chain graphic]
                </div>
              </div>

              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="border rounded-md p-4 bg-slate-50">
                  <p className="text-xs text-slate-500">Current Hash:</p>
                  <p className="font-mono text-sm break-all mt-1">{transaction.currentHash}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Previous Hash: 4a5b6c7d8e9f0g1h...
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-md flex items-center gap-2">
                      <CheckCircleIcon /> Verify Integrity
                    </button>
                    <span className="text-sm text-slate-500">Hash verified and immutable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white p-5 border rounded-lg">
            <h3 className="font-semibold mb-3">Supporting Documents</h3>

            <div className="border p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DocumentArrowDownIcon className="text-slate-500" />
                <div>
                  <p className="font-medium">Download Official Receipt (PDF)</p>
                  <p className="text-xs text-slate-400">Issued by TransparifyNGO</p>
                </div>
              </div>
              <button className="px-3 py-2 border rounded-md">Download</button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-4">

          {/* Donor Snapshot */}
          <div className="bg-white p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Donor Snapshot</h4>

            <div className="flex items-center gap-3">
              <img src={DONOR_IMG} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-medium">Maria Rodriguez</p>
                <p className="text-xs text-slate-500">Member Since: 2022</p>
                <p className="text-xs text-slate-500">Total Donations: $12,500</p>
              </div>
            </div>

            <div className="mt-4 h-24 bg-slate-50 rounded-md flex items-center justify-center text-slate-400">
              [mini donation chart]
            </div>

            <Link to="/donor-details-dashboard">
              <button className="mt-3 w-full border px-3 py-2 rounded-md">View Donor Profile</button>
            </Link>
          </div>

          {/* In-Kind Section */}
          <div className="bg-white p-4 border rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">In-Kind Contributions</h4>
            <p className="text-slate-500 text-sm">No in-kind items for this transaction.</p>
          </div>

          {/* Related Transactions */}
          <div className="bg-white p-4 border rounded-lg text-sm">
            <h4 className="font-semibold mb-2">Related Transactions</h4>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">TX-2024-04518</p>
                  <p className="text-xs text-slate-500">Oct 20, 2024</p>
                </div>
                <p className="font-medium">$150.00</p>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="font-medium">TX-2024-04501</p>
                  <p className="text-xs text-slate-500">Oct 15, 2024</p>
                </div>
                <p className="font-medium">$50.00</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
