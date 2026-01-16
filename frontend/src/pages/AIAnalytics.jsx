import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, TrendingUp, Users, Brain } from 'lucide-react';
import axios from 'axios';
import DashboardHeader from "@/components/layout/DashboardHeader";
import TrustScoreCard from "@/components/ai/TrustScoreCard";
import FundAllocationChart from "@/components/ai/FundAllocationChart";

const AIAnalytics = () => {
    const [trends, setTrends] = useState(null);
    const [fake, setFake] = useState(null);
    const [donors, setDonors] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState('');
    const [transactionAnomalies, setTransactionAnomalies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendsRes, fakeRes, donorsRes, fraudScanRes, campaignsRes] = await Promise.all([
                    axios.get('https://transparifyngo.onrender.com/api/ai/trends/donation-analysis'),
                    axios.get('https://transparifyngo.onrender.com/api/ai/transparency/fake-detection'),
                    axios.get('https://transparifyngo.onrender.com/api/ai/trends/donor-behavior'),
                    axios.get('https://transparifyngo.onrender.com/api/ai/fraud-scan'),
                    axios.get('https://transparifyngo.onrender.com/api/campaign/ngos/campaigns')
                ]);

                setTrends(trendsRes.data);
                setFake(fakeRes.data);
                setDonors(donorsRes.data);
                setTransactionAnomalies(fraudScanRes.data);
                setCampaigns(campaignsRes.data || []);

                if (campaignsRes.data?.length > 0) {
                    setSelectedCampaignId(campaignsRes.data[0]._id);
                }

                console.log("AI Data loaded successfully");
            } catch (error) {
                console.error("Error fetching AI data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="p-6 pt-16">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">Loading AI Insights...</div>
                </div>
            </main>
        </div>
    );

    const chartData = trends && trends.monthly_trends ? Object.entries(trends.monthly_trends).map(([name, value]) => ({ name, value })) : [];

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />

            <main className="p-6 pt-16">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-6 w-6 text-primary" />
                        <h1 className="text-2xl font-bold">AI & ML Insights</h1>
                    </div>
                    <p className="text-muted-foreground">Specialized Tracking for TransparifyNGO Project</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Donations (Trend)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{trends?.total_donations?.toLocaleString() || 0}</div>
                            <p className="text-xs text-muted-foreground">{trends?.average_donation ? `Average: ₹${trends.average_donation.toFixed(2)}` : 'No data'}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Fraud/Risk Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(fake?.suspicious_ngos?.length || 0) + (transactionAnomalies?.anomalies?.length || 0)}</div>
                            <p className="text-xs text-muted-foreground">Suspicious entities & transactions</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Frequent Donors</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{donors?.summary?.frequent_donors || 0}</div>
                            <p className="text-xs text-muted-foreground">Identify loyal supporters</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">High Impact Donors</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{donors?.summary?.high_impact_donors || 0}</div>
                            <p className="text-xs text-muted-foreground">Major contributors</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Donation Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                            {chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-muted-foreground text-center">
                                    {trends?.message || "No trend data available."}
                                    {trends?.using_collection && <p className="text-xs mt-2">Source: {trends.using_collection}</p>}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Alerts & Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
                            {/* Fake NGO Alerts */}
                            {fake?.suspicious_ngos?.map((ngo, idx) => (
                                <Alert key={`fake-${idx}`} variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Suspicious NGO: {ngo.title}</AlertTitle>
                                    <AlertDescription>
                                        Reasons: {ngo.reasons?.join(", ")}
                                    </AlertDescription>
                                </Alert>
                            ))}

                            {/* Transaction Anomalies */}
                            {transactionAnomalies?.anomalies?.map((anomaly, idx) => (
                                <Alert key={`anomaly-${idx}`} variant="destructive" className="border-orange-500 text-orange-700">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <AlertTitle className="flex items-center justify-between">
                                        <span>Transaction Anomaly Detected</span>
                                        <span className={`text-xs px-2 py-1 rounded ${anomaly.risk_score === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                                            {anomaly.risk_score} Risk
                                        </span>
                                    </AlertTitle>
                                    <AlertDescription>
                                        <div className="space-y-2 mt-2">
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <p><strong>Amount:</strong> ₹{anomaly.amount?.toLocaleString()}</p>
                                                <p><strong>Date:</strong> {new Date(anomaly.created_at).toLocaleDateString()}</p>
                                                <p><strong>Donor:</strong> {anomaly.donor_name}</p>
                                                <p><strong>Receipt:</strong> {anomaly.receipt}</p>
                                            </div>
                                            <div className="border-t border-orange-200 pt-2 mt-2">
                                                <p className="font-semibold text-sm mb-1">Why flagged:</p>
                                                <ul className="list-disc list-inside text-xs space-y-1">
                                                    {anomaly.reasons?.map((reason, ridx) => (
                                                        <li key={ridx}>{reason}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">ID: {anomaly.transaction_id}</p>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            ))}

                            {(!fake?.suspicious_ngos?.length && !transactionAnomalies?.anomalies?.length) && (
                                <Alert>
                                    <ShieldCheck className="h-4 w-4" />
                                    <AlertTitle>All Systems Normal</AlertTitle>
                                    <AlertDescription>No major anomalies detected by AI.</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Analysis Row: Trust Score & Fund Allocation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    <TrustScoreCard ngoId="global" />
                    <FundAllocationChart
                        campaignId={selectedCampaignId}
                        campaigns={campaigns}
                        onSelect={setSelectedCampaignId}
                    />
                </div>
            </main>
        </div>
    );
};

export default AIAnalytics;
