import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DonorNavbar from "@/components/layout/DonorNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DonorDonation = () => {
  const [user, setUser] = useState({ name: "", totalDonated: 0 });
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        // Fetch logged-in user
        const userRes = await fetch("http://localhost:4000/api/user/me", {
          credentials: "include",
        });
        const userData = await userRes.json();
        if (userRes.ok) setUser({ name: userData.name || "Donor", totalDonated: 0 });

        // Fetch donation overview
        const donationRes = await fetch("http://localhost:4000/api/donations/overview", {
          credentials: "include",
        });
        const donationData = await donationRes.json();

        if (donationRes.ok && donationData.success) {
          // Set total donated from API
          const totalDonatedMoney = donationData.stats.totalDonatedMoney || 0;
          setUser((prev) => ({ ...prev, totalDonated: totalDonatedMoney }));

          // Format donation history
          const formattedDonations = donationData.recentDonations.map((donation) => {
            const isFinancial = donation.type === "financial";
            return {
              id: donation._id,
              date: new Date(donation.createdAt).toLocaleDateString(),
              ngo: donation.donor?.name || "Unknown NGO",
              project: isFinancial
                ? "Financial Donation"
                : donation.items?.[0]?.description || "In-Kind Donation",
              amount: isFinancial
                ? `₹${donation.amount}`
                : `₹${donation.items?.reduce((sum, item) => sum + item.estimatedValue, 0)}`,
              status: "Completed",
            };
          });

          setDonations(formattedDonations);
        }
      } catch (error) {
        console.error("Failed to load donation data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading donation details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DonorNavbar userName={user.name} />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">All Donations</h1>
          <p className="text-muted-foreground">
            Complete details of all donations made by you
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-card border rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Donor Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <p className="font-semibold text-primary">₹{user.totalDonated}</p>
          </div>
        </div>

        {/* DONATIONS TABLE */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>

          {donations.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No donation history available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="py-3 text-left">Date</th>
                    <th className="py-3 text-left">NGO</th>
                    <th className="py-3 text-left">Project</th>
                    <th className="py-3 text-left">Amount</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b last:border-0 hover:bg-muted/40 transition"
                    >
                      <td className="py-3">{donation.date}</td>
                      <td>{donation.ngo}</td>
                      <td>{donation.project}</td>
                      <td className="font-medium">{donation.amount}</td>
                      <td>
                        <Badge className="bg-green-100 text-green-700">
                          {donation.status}
                        </Badge>
                      </td>
                      <td>
                        <Link to={`/donation/${donation.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonorDonation;
