import { DollarSign, Gift, Package } from "lucide-react";

export function ImpactMetrics({ data }) {
    const metrics = [
        {
            title: "Total Funds Raised",
            value: `₹${(data?.financial?.totalAmount || 0).toLocaleString()}`,
            subtitle: `${data?.financial?.count || 0} Donations`,
            icon: DollarSign,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            title: "In-Kind Value",
            value: `₹${(data?.inKind?.totalEstimatedValue || 0).toLocaleString()}`,
            subtitle: `${data?.inKind?.count || 0} Items Donated`,
            icon: Gift,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Inventory Items",
            value: (data?.inventory?.totalItems || 0).toLocaleString(),
            subtitle: "Items Distributed/Available",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className={`p-4 rounded-full ${metric.bg}`}>
                        <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">{metric.title}</p>
                        <h3 className="text-2xl font-bold">{metric.value}</h3>
                        <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
