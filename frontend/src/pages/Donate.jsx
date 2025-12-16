import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "@/components/layout/DonorNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { X, Plus, Trash2, Heart, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

// Modal Component
const DonationModal = ({ campaign, onClose, onSuccess, user }) => {
  const [donationType, setDonationType] = useState("financial");
  const [amount, setAmount] = useState("");
  const [inKindDetails, setInKindDetails] = useState([{ description: "", estimatedValue: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://localhost:4000/api";

  // Handle in-kind item changes
  const handleInKindChange = (index, field, value) => {
    const newDetails = [...inKindDetails];
    newDetails[index][field] = value;
    setInKindDetails(newDetails);
  };

  const addInKindItem = () => setInKindDetails([...inKindDetails, { description: "", estimatedValue: "" }]);

  const removeInKindItem = (index) => {
    if (inKindDetails.length === 1) return;
    const newDetails = [...inKindDetails];
    newDetails.splice(index, 1);
    setInKindDetails(newDetails);
  };

  // ===============================
  // Handle donation submission
  // ===============================
  const handleDonateSubmit = async () => {
    if (!campaign){ toast.error("Select a campaign"); return;}
    if (!user || !user.name || !user.email){ toast.error("User information not available"); return;}

    if (donationType === "financial" && (!amount || isNaN(amount) || Number(amount) <= 0)) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    if (donationType === "in-kind" && inKindDetails.some(i => !i.description.trim() || !i.estimatedValue || Number(i.estimatedValue) <= 0)) {
      toast.error("Please fill all in-kind item details with valid values");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare financial and in-kind entries
      const financialEntry = donationType === "financial" ? [{
        campaignName: campaign.title,
        amount: Number(amount),
        date: new Date()
      }] : [];

      const inKindEntry = donationType === "in-kind" ? inKindDetails.map(item => ({
        campaignName: campaign.title,
        description: item.description,
        estimatedValue: Number(item.estimatedValue),
        date: new Date()
      })) : [];

      const totalThisDonation = donationType === "financial"
        ? Number(amount)
        : inKindEntry.reduce((sum, item) => sum + item.estimatedValue, 0);

      // Build payload
      const payload = {
        type: donationType,
        donor: { 
          userId: user._id,
          name: user.name,
          email: user.email
        },
        financialDetails: financialEntry,
        inKindDetails: inKindEntry.length ? { items: inKindEntry } : undefined,
        amount: totalThisDonation,
        paymentMethod: donationType === "financial" ? "dummy" : undefined,
        providerRef: donationType === "financial" ? "DUMMY123" : undefined
      };

      // Send donation request
      await axios.post(`${API_BASE_URL}/campaign/${campaign._id}/donate`, payload, { withCredentials: true });

      toast.success("Donation successful! Thank you for your contribution.");
      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Donation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#006d77] to-[#00afb9] p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 pr-12">
            <Heart className="text-white" size={32} fill="currentColor" />
            <div>
              <h3 className="text-2xl font-bold text-white">{campaign.title}</h3>
              <p className="text-white/90 text-sm mt-1">Make a difference today</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Donor Info Display */}
          {user && (
            <div className="bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2] p-4 rounded-2xl border-2 border-[#00afb9]/30">
              <p className="text-sm text-[#006d77] font-semibold mb-1">Donating as:</p>
              <p className="text-lg font-bold text-[#006d77]">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          )}

          {/* Donation Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`relative py-4 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                  donationType === "financial"
                    ? "bg-gradient-to-r from-[#006d77] to-[#00afb9] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setDonationType("financial")}
              >
                {donationType === "financial" && (
                  <span className="absolute top-2 right-2 text-white">✓</span>
                )}
                <div className="text-lg">💰 Financial</div>
                <div className="text-xs mt-1 opacity-80">Monetary contribution</div>
              </button>
              <button
                className={`relative py-4 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                  donationType === "in-kind"
                    ? "bg-gradient-to-r from-[#006d77] to-[#00afb9] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setDonationType("in-kind")}
              >
                {donationType === "in-kind" && (
                  <span className="absolute top-2 right-2 text-white">✓</span>
                )}
                <div className="text-lg">📦 In-Kind</div>
                <div className="text-xs mt-1 opacity-80">Goods or services</div>
              </button>
            </div>
          </div>

          {/* Financial Donation Input */}
          {donationType === "financial" && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Donation Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#00afb9] focus:border-transparent text-lg transition-all duration-200"
                  min="1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[500, 1000, 2500, 5000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#00afb9] hover:text-white rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* In-Kind Donation Inputs */}
          {donationType === "in-kind" && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Item Details</label>
              {inKindDetails.map((item, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 relative space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#006d77]">Item {idx + 1}</span>
                    {inKindDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInKindItem(idx)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Item description (e.g., Books, Clothing)"
                    value={item.description}
                    onChange={(e) => handleInKindChange(idx, "description", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00afb9] focus:border-transparent transition-all duration-200"
                  />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      placeholder="Estimated value"
                      value={item.estimatedValue}
                      onChange={(e) => handleInKindChange(idx, "estimatedValue", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00afb9] focus:border-transparent transition-all duration-200"
                      min="1"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addInKindItem}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#006d77] rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Plus size={20} />
                Add Another Item
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleDonateSubmit}
            disabled={isSubmitting || !user}
            className="w-full py-4 bg-gradient-to-r from-[#006d77] to-[#00afb9] text-white rounded-2xl shadow-lg hover:shadow-xl font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Complete Donation"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate days remaining
const calculateDaysLeft = (startDate, endDate) => {
  if (!endDate) return null;
  
  const now = new Date();
  const end = new Date(endDate);
  const start = new Date(startDate);
  
  // If campaign hasn't started yet
  if (now < start) {
    return { status: 'upcoming', days: Math.ceil((start - now) / (1000 * 60 * 60 * 24)) };
  }
  
  // If campaign has ended
  if (now > end) {
    return { status: 'ended', days: 0 };
  }
  
  // Campaign is active
  const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return { status: 'active', days: daysLeft };
};

export default function Donate() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const API_BASE_URL = "http://localhost:4000/api";

  // Fetch user information
  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/user/me`, { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      // If user is not authenticated, redirect or show message
      if (err.response?.status === 401) {
        toast.error("Please log in to make donations.");
        // Optional: redirect to login page
        // window.location.href = "/login";
      }
    } finally {
      setUserLoading(false);
    }
  };

  // Fetch campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/campaign/ngos/campaigns`, { withCredentials: true });
      
      // Filter only Active campaigns (case-insensitive)
      const activeCampaigns = res.data.filter(c => c.status?.toLowerCase() === "active");
      setCampaigns(activeCampaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      toast.error("Failed to load campaigns. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea]">
      <DashboardHeader />
      
      <main className="flex-1 py-16 px-4 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-extrabold text-[#006d77] drop-shadow-sm">
            Support a Campaign
          </h1>
          <p className="text-lg text-[#006d77]/80 max-w-2xl mx-auto">
            Your contribution can make a real difference. Choose a campaign and donate today.
          </p>
          {user && (
            <p className="text-sm text-[#006d77] font-medium">
              Welcome back, <span className="font-bold">{user.name}</span>!
            </p>
          )}
        </div>

        {loading || userLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-[#00afb9] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#006d77] font-semibold text-lg">
              {userLoading ? "Loading user information..." : "Loading campaigns..."}
            </p>
          </div>
        ) : !user ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔒</div>
              <p className="text-xl text-[#006d77] font-semibold mb-2">Authentication Required</p>
              <p className="text-gray-600 mb-4">Please log in to make donations.</p>
              <Button
                onClick={() => window.location.href = "/login"}
                className="bg-gradient-to-r from-[#006d77] to-[#00afb9] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Go to Login
              </Button>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl text-[#006d77] font-semibold mb-2">No Active Campaigns</p>
              <p className="text-gray-600">There are currently no active campaigns available for donations.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map(c => {
              const percentage = Math.min(Math.round((c.collectedAmount / c.goalAmount) * 100), 100);
              const timeInfo = calculateDaysLeft(c.startDate, c.endDate);
              
              return (
                <div 
                  key={c._id} 
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#006d77] to-[#00afb9]">
                    <img
                      src={c.bannerUrl || "/placeholder.png"}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {timeInfo && timeInfo.status === 'active' && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Calendar size={16} className="text-[#006d77]" />
                        <span className="text-sm font-bold text-[#006d77]">
                          {timeInfo.days} {timeInfo.days === 1 ? 'day' : 'days'} left
                        </span>
                      </div>
                    )}
                    {timeInfo && timeInfo.status === 'upcoming' && (
                      <div className="absolute top-4 right-4 bg-yellow-500/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Calendar size={16} className="text-white" />
                        <span className="text-sm font-bold text-white">
                          Starts in {timeInfo.days} {timeInfo.days === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-[#006d77] line-clamp-2 min-h-[3.5rem]">
                      {c.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                      {c.description || "Help us make a difference with your generous contribution."}
                    </p>

                    {/* Progress Section */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} className="text-[#00afb9]" />
                          <span className="font-bold text-[#006d77]">
                            ₹{c.collectedAmount?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <span className="text-gray-500 font-medium mb-3">
                          of ₹{c.goalAmount?.toLocaleString() || '0'}
                        </span>

                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#006d77] to-[#00afb9] transition-all duration-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="absolute -top-6 right-0 text-sm font-bold text-[#006d77]">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Donate Button */}
                    <Button
                      onClick={() => setSelectedCampaign(c)}
                      className="w-full py-3 bg-gradient-to-r from-[#006d77] to-[#00afb9] text-white rounded-2xl shadow-lg hover:shadow-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 mt-4"
                    >
                      <Heart size={20} fill="currentColor" />
                      Donate Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedCampaign && user && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={fetchCampaigns}
          user={user}
        />
      )}

      <Footer />
    </div>
  );
}