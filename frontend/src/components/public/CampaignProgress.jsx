import { Progress } from "@/components/ui/progress";

export function CampaignProgress({ campaigns }) {
    if (!campaigns) return null;

    const isActive = (c) => {
        return c.totalRaised < c.targetAmount &&
            new Date() <= new Date(c.deadline) &&
            c.status !== 'completed';
    };

    const activeCampaigns = campaigns.filter(isActive);
    const inactiveCampaigns = campaigns.filter(c => !isActive(c));

    const renderCampaign = (campaign, index) => {
        const progress = campaign.targetAmount > 0
            ? Math.min((campaign.totalRaised / campaign.targetAmount) * 100, 100)
            : 0;

        let statusLabel = "Active";
        let statusColor = "text-green-600 bg-green-100";

        if (campaign.totalRaised >= campaign.targetAmount) {
            statusLabel = "Goal Met";
            statusColor = "text-blue-600 bg-blue-100";
        } else if (new Date() > new Date(campaign.deadline)) {
            statusLabel = "Deadline Crossed";
            statusColor = "text-red-600 bg-red-100";
        } else if (campaign.status === 'completed') {
            statusLabel = "Completed";
            statusColor = "text-gray-600 bg-gray-100";
        }

        return (
            <div key={index} className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="font-medium block">{campaign.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
                            {statusLabel}
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Raised: ₹{campaign.totalRaised?.toLocaleString()}</span>
                    <span>Goal: ₹{campaign.targetAmount?.toLocaleString()}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
            <h3 className="font-bold text-lg mb-6">Campaigns Overview</h3>

            <div className="space-y-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Active Campaigns Section */}
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Active Campaigns</h4>
                    <div className="space-y-4">
                        {activeCampaigns.length > 0 ? (
                            activeCampaigns.map(renderCampaign)
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No active campaigns.</p>
                        )}
                    </div>
                </div>

                {/* Inactive Campaigns Section */}
                {inactiveCampaigns.length > 0 && (
                    <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Past Campaigns</h4>
                        <div className="space-y-4">
                            {inactiveCampaigns.map(renderCampaign)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
