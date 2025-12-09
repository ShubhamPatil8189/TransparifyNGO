import { useState } from "react";
import { Link } from "react-router-dom";
import { Share2, Play, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";

const donors = [
  { name: "Maria G.", amount: "$100" },
  { name: "Ahmed K.", amount: "$50" },
  { name: "Sarah L.", amount: "$250" },
  { name: "David P.", amount: "$75" },
  { name: "Priya S.", amount: "$500" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200",
  "https://images.unsplash.com/photo-1594708767771-a5c4d7a7c3a7?w=200",
  "https://images.unsplash.com/photo-1541802645635-11f2286a7482?w=200",
  "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=200",
];

const amountOptions = ["$50", "$100", "$250", "Other"];

const CampaignDetail = () => {
  const [selectedAmount, setSelectedAmount] = useState("$100");
  const [customAmount, setCustomAmount] = useState("100");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">NGO Transparency Platform</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/all-campaigns" className="text-muted-foreground hover:text-foreground">Campaigns</Link>
            <Link to="/reports" className="text-muted-foreground hover:text-foreground">Reports</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/profile" className="text-muted-foreground hover:text-foreground">Profile</Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-primary/80 to-secondary/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Clean Water for Rural Communities</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-secondary h-2 rounded-full w-64">
              <div className="bg-primary h-2 rounded-full" style={{ width: "76%" }} />
            </div>
            <span className="text-white font-medium">76% Funded</span>
            <span className="text-white/80">- $37,500 raised of $50,000 goal</span>
          </div>
          
          <div className="flex gap-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Donate Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Campaign Details</h2>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground mb-4">
                This campaign aims to provide sustainable clean water access to over 5,000 people in rural areas. 
                Iworas. Your donation supports drilling wells, installing pumps, and community training for maintenance.
              </p>
              <p className="text-muted-foreground">Every dollar brings health and hope.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Impact Gallery</h3>
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                    <img src={img} alt={`Impact ${index + 1}`} className="w-full h-full object-cover" />
                    {index > 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Recent Donors</h3>
              <ul className="space-y-2">
                {donors.map((donor, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {donor.name} - {donor.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Column - Donation Form */}
          <div>
            <div className="bg-card rounded-lg p-6 sticky top-8">
              <div className="bg-secondary text-secondary-foreground text-center py-3 rounded-lg mb-6">
                <h3 className="font-semibold">Support Our Cause</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Donation Amount</label>
                  <Input
                    type="text"
                    value={`$${customAmount}`}
                    onChange={(e) => setCustomAmount(e.target.value.replace(/\$/g, ""))}
                    className="text-center text-lg font-medium"
                  />
                </div>
                
                <div className="flex gap-2">
                  {amountOptions.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        if (amount !== "Other") setCustomAmount(amount.replace("$", ""));
                      }}
                      className={cn(
                        "flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                        selectedAmount === amount
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button variant="outline" className="w-full h-12 justify-center">
                    <span className="font-bold text-purple-600">UPI</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 justify-center">
                    <span className="font-bold text-purple-600">stripe</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 justify-center">
                    <span className="font-bold text-blue-600">Razorpay</span>
                  </Button>
                </div>
                
                <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Donate Securely
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CampaignDetail;
