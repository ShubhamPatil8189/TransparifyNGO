import { ArrowRight } from "lucide-react";

export function DonationFlow({ transactions }) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Live Donation Flow</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-muted-foreground">Live Updates</span>
                </div>
            </div>

            <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {transactions && transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                    {tx.type === 'financial' ? '₹' : '🎁'}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        {tx.donor?.name || "Anonymous"}
                                        <span className="text-xs text-muted-foreground font-normal ml-2">
                                            to {tx.campaign?.title || "General Fund"}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {tx.type === 'financial' ? 'Donated' : 'Gifted In-Kind'} • {new Date(tx.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">
                                    {tx.type === 'financial'
                                        ? `₹${tx.amount?.toLocaleString()}`
                                        : 'In-Kind'}
                                </p>
                                <p className="text-xs text-muted-foreground">Verified</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-4">No recent donations.</p>
                )}
            </div>
        </div>
    );
}
