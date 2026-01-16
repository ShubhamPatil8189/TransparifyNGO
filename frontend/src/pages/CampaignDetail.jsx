import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Footer } from "@/components/layout/Footer";
import EditCampaignModal from "@/components/modals/EditCampaignModal"; // <-- import modal

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false); // <-- modal state

  const API_BASE_URL = "https://transparifyngo.onrender.com/api";

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/campaign/${id}`, {
          withCredentials: true,
        });
        setCampaign(res.data);
      } catch (err) {
        console.error("Failed to fetch campaign details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex justify-center items-center">
          <p>Loading campaign details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex justify-center items-center">
          <p>Campaign not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const goalAmount = campaign.goalAmount ?? 0;
  const collectedAmount = campaign.collectedAmount ?? 0;
  const percentage = Math.round((collectedAmount / goalAmount) * 100) || 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 flex justify-center p-6">
        <div className="w-full max-w-3xl bg-card rounded-lg border border-border p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{campaign.title || "Untitled Campaign"}</h1>
            <Link to="/campaigns" className="text-primary hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Campaigns
            </Link>
          </div>

          {/* Campaign Details */}
          <div className="space-y-4">
            {campaign.bannerUrl && (
              <img
                src={campaign.bannerUrl}
                alt="Campaign Banner"
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{campaign.status || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal Amount</p>
                <p className="font-medium">₹{goalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="font-medium">₹{collectedAmount.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Progress</p>
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.min(percentage, 100)}%` }} />
              </div>
              <p className="text-xs mt-1">{percentage}%</p>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="whitespace-pre-line">{campaign.description || "No description provided."}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={() => setShowEdit(true)}>Edit Campaign</Button>
          </div>

          {/* Edit Campaign Modal */}
          {showEdit && (
            <EditCampaignModal
              campaign={campaign}
              onClose={() => setShowEdit(false)}
              onUpdate={(updatedCampaign) => setCampaign(updatedCampaign)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
