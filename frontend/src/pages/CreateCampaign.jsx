import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Image,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Redo,
  Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/layout/DashboardHeader";
import axios from "axios";
import { toast } from "sonner";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:4000/api";

  const handleCreateCampaign = async (status) => {
    if (!title || !description || !goalAmount || !deadline) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/campaign/ngos/campaigns`,
        {
          title,
          description,
          goalAmount: Number(goalAmount),
          deadline,
          bannerUrl: "",
          status,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Campaign created");
      navigate("/campaigns");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create campaign");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-3xl bg-card rounded-lg border border-border p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Create Campaign</h1>
            <Link
              to="/campaigns"
              className="text-primary hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Campaigns
            </Link>
          </div>

          {/* Banner Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Campaign Banner Image
            </p>
            <Button variant="outline">Upload Banner</Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Campaign Title
              </label>
              <Input
                placeholder="Enter a compelling title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Goal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    placeholder="0.00"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Deadline
                </label>
                <Input
                  type="date"
                  placeholder="Select date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description
              </label>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Strikethrough className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Quote className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Describe the campaign's purpose, impact, and story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-0 min-h-32 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Publish Button Centered */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => handleCreateCampaign("published")}
              className="w-full max-w-xs"
            >
              Publish Campaign
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
