import { useEffect, useState } from "react";
import axios from "axios";
import { ImpactMetrics } from "@/components/public/ImpactMetrics";
import { DonationFlow } from "@/components/public/DonationFlow";
import { CampaignProgress } from "@/components/public/CampaignProgress";
import { PublicHeader } from "@/components/layout/PublicHeader";

export default function TransparencyWall() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://transparifyngo.onrender.com/api/public/transparency");
                if (res.data.success) {
                    setData(res.data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch transparency data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Optional: Poll for updates every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <PublicHeader />

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Public Transparency Wall</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Real-time insights into our impact, financial flow, and campaign progress.
                        We believe in complete openness to build trust with our community.
                    </p>
                    <a
                        href="https://transparifyngo.onrender.com/api/public/report"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Download Transparency Report (PDF)
                    </a>
                </div>

                <ImpactMetrics data={data} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DonationFlow transactions={data?.recent} />
                    <CampaignProgress campaigns={data?.campaigns} />
                </div>

                <div className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Data is updated in real-time. Donor identities are protected for privacy.</p>
                </div>
            </main>
        </div>
    );
}
