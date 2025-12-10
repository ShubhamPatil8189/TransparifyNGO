import { useState } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, GraduationCap, Stethoscope, Utensils } from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "Build a School in rural Kenya",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
    goal: 20000,
    raised: 15000,
    category: "Education",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Mobile Health Clinic for Remote Areas",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop",
    goal: 10000,
    raised: 4500,
    category: "Health",
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Community Food Bank Initiative",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
    goal: 8000,
    raised: 8000,
    category: "Food",
    icon: Utensils,
  },
];

export default function AllCampaigns() {
  const [goalCompletion, setGoalCompletion] = useState([0]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="px-6 py-4 text-sm text-muted-foreground bg-card border-b border-border">
          Home ›TransparifyNGO - <span className="text-foreground">All Campaigns</span>
        </div>

        <div className="flex">
          {/* Sidebar Filters */}
          <aside className="w-64 p-6 border-r border-border bg-card">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="education" />
                    <label htmlFor="education" className="text-sm">Education</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="health" />
                    <label htmlFor="health" className="text-sm">Health</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="food" />
                    <label htmlFor="food" className="text-sm">Food</label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Goal Completion</h3>
                <Slider
                  value={goalCompletion}
                  onValueChange={setGoalCompletion}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select defaultValue="recent">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="funded">Most Funded</SelectItem>
                    <SelectItem value="ending">Ending Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Campaign Grid */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Active Campaigns (12)</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => {
                const percentage = Math.round((campaign.raised / campaign.goal) * 100);
                const Icon = campaign.icon;
                
                return (
                  <div key={campaign.id} className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{campaign.title}</h3>
                      
                      <div className="mb-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()} ({percentage}% Funded)
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                          <Icon className="w-3 h-3" />
                          {campaign.category}
                        </span>
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        Donate now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8 text-sm text-muted-foreground">
              Page 1 of 4
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
