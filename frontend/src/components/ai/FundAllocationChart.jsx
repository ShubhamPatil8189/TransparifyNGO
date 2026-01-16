import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const FundAllocationChart = ({
    campaignId,
    campaigns = [],
    onSelect = () => { },
    hideHeader = false
}) => {
    const [allocationData, setAllocationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!campaignId || campaignId === "sample-campaign-id") {
            setError("No campaign selected. Select a campaign to view fund allocation.");
            setAllocationData(null); // Clear previous data if no campaign is selected
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const fetchAllocation = async () => {
            try {
                const res = await axios.get(`https://transparifyngo.onrender.com/api/ai/transparency/fund-allocation/${campaignId}`);
                setAllocationData(res.data);
            } catch (error) {
                console.error("Error fetching fund allocation:", error);
                setError("Failed to load fund allocation. Please try again.");
                setAllocationData(null); // Clear data on error
            } finally {
                setLoading(false);
            }
        };

        fetchAllocation();
    }, [campaignId]);

    const { campaign_title, raised, spent, deviation_alert, allocation_breakdown, message } = allocationData || {};

    // Prepare data for pie chart
    const chartData = Object.entries(allocation_breakdown || {}).map(([name, value]) => ({
        name,
        value: parseFloat(value)
    }));

    return (
        <Card className="flex flex-col h-full border-none shadow-none">
            {!hideHeader && (
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        Fund Allocation
                    </CardTitle>

                    {campaigns.length > 0 && (
                        <select
                            value={campaignId}
                            onChange={(e) => onSelect(e.target.value)}
                            className="p-1.5 border rounded-md text-sm bg-background border-primary/30 focus:ring-1 focus:ring-primary/20 outline-none max-w-[180px]"
                        >
                            {campaigns.map(camp => (
                                <option key={camp._id} value={camp._id}>{camp.title}</option>
                            ))}
                        </select>
                    )}
                </CardHeader>
            )}
            <CardContent className="space-y-4 flex-1">
                {loading && <div className="text-muted-foreground">Loading fund allocation...</div>}

                {error && (
                    <div className="text-sm text-muted-foreground py-4 text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && allocationData && (
                    <>
                        {/* Raised vs Spent */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <p className="text-xs text-green-700 font-semibold">Total Raised</p>
                                <p className="text-2xl font-bold text-green-800">₹{raised?.toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-700 font-semibold">Total Spent</p>
                                <p className="text-2xl font-bold text-blue-800">₹{spent?.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Alert */}
                        {deviation_alert ? (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Spending Alert</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        ) : (
                            <Alert className="border-green-500 text-green-700">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle>On Track</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        {/* Allocation Breakdown Pie Chart */}
                        {chartData.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold mb-2">Allocation Breakdown:</p>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default FundAllocationChart;
