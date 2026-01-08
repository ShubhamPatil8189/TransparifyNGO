import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from 'lucide-react';
import axios from 'axios';

const TrustScoreCard = ({ ngoId }) => {
    const [trustData, setTrustData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ngoId || ngoId === "sample-ngo-id") {
            setError("No NGO selected. Select an NGO to view trust score.");
            return;
        }

        setLoading(true);
        setError(null);

        const fetchTrustScore = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/ai/transparency/trust-score/${ngoId}`);
                setTrustData(res.data);
            } catch (error) {
                console.error("Error fetching trust score:", error);
                setError("Failed to load trust score. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrustScore();
    }, [ngoId]);

    const { trust_score, level, factors } = trustData || {};

    const levelColors = {
        High: 'text-green-600 bg-green-100',
        Medium: 'text-yellow-600 bg-yellow-100',
        Low: 'text-red-600 bg-red-100'
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">NGO Trust Score</CardTitle>
                <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
                {loading && <div className="text-muted-foreground">Loading trust score...</div>}

                {error && (
                    <div className="text-sm text-muted-foreground py-4 text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && trustData && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className={`text-4xl font-bold ${getScoreColor(trust_score)}`}>
                                {trust_score}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColors[level]}`}>
                                {level} Trust
                            </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all ${trust_score >= 80 ? 'bg-green-600' :
                                        trust_score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                                    }`}
                                style={{ width: `${trust_score}%` }}
                            />
                        </div>

                        {factors && (
                            <div className="space-y-2 mt-4">
                                <p className="text-xs font-semibold text-muted-foreground">Contributing Factors:</p>
                                {Object.entries(factors).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between text-xs">
                                        <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TrustScoreCard;
