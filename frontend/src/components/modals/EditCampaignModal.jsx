import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

export default function EditCampaignModal({ campaign, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const API_BASE_URL = "https://transparifyngo.onrender.com/api";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      setTitle(campaign.title || "");
      setGoalAmount(campaign.goalAmount || "");
      setDeadline(campaign.endDate ? new Date(campaign.endDate).toISOString().split("T")[0] : "");
      setDescription(campaign.description || "");
    }
  }, [campaign]);

  const handleSave = async () => {
    if (!title || !goalAmount || !deadline || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/campaign/${campaign._id}`,
        {
          title,
          goalAmount: Number(goalAmount),
          deadline,
          description,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Campaign updated successfully!");
      onUpdate(res.data.campaign);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      toast.error(err.response?.data?.message || "Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-card rounded-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Edit Campaign</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Goal Amount</label>
            <Input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Deadline</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
