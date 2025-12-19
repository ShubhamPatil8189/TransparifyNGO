import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { User } from "lucide-react";
import axios from "axios";

const formatDate = (iso) => {
  try {
    return new Date(iso.$date || iso).toLocaleDateString();
  } catch {
    return "—";
  }
};

export default function DonorDetail() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:4000/api";

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/donor/${id}`, {
          withCredentials: true,
        });
        setDonor(res.data);
      } catch (err) {
        console.error("Failed to fetch donor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex justify-center items-center">
          <p>Loading donor details...</p>
        </main>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex justify-center items-center">
          <p>Donor not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        

        {/* Donor Info */}
        <div className="bg-card border rounded-lg p-6 flex gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="w-10 h-10" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{donor.name}</h2>
            <p className="text-sm text-muted-foreground">{donor.email}</p>
            <p className="mt-2 text-sm">
              <span className="font-medium">Total Donated:</span> ₹{donor.totalDonated || 0}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Joined: {formatDate(donor.createdAt)}
            </p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="mt-6 bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Campaigns Donated</h3>
          {donor.campaignDonated?.length > 0 ? (
            <ul className="list-disc list-inside text-sm">
              {donor.campaignDonated.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No campaigns donated yet.</p>
          )}
        </div>

        {/* Financial Donations */}
        {donor.financialDetails?.length > 0 && (
          <div className="mt-6 bg-card border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Financial Donations</h3>
            <ul className="list-disc list-inside text-sm">
              {donor.financialDetails.map((item, idx) => (
                <li key={idx}>
                  {item.campaignName}: ₹{item.amount} – {formatDate(item.date)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* In-Kind Donations */}
        {donor.inKindDetails?.length > 0 && (
          <div className="mt-6 bg-card border rounded-lg p-4">
            <h3 className="font-semibold mb-2">In-Kind Donations</h3>
            <ul className="list-disc list-inside text-sm">
              {donor.inKindDetails.map((item, idx) => (
                <li key={idx}>
                  {item.campaignName}: {item.description} (₹{item.estimatedValue}) – {formatDate(item.date)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
