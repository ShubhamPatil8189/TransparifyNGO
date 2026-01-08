import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Clean Water Project", value: 154500, color: "hsl(var(--primary))" },
  { name: "Education Fund", value: 28000, color: "hsl(var(--chart-teal))" },
  { name: "Medical Relief", value: 100, color: "hsl(var(--chart-green))" },
  { name: "Food Security", value: 2500, color: "hsl(var(--chart-orange))" }
];

export function CampaignChart({ data = [] }) {
  return (
    <div className="dashboard-card p-6">
      <h3 className="font-semibold mb-2">Campaign Performance</h3>
      <p className="text-sm text-muted-foreground mb-4">Top Campaigns (Donations)</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              horizontal={true}
              vertical={false}
            />

            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />

            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
              width={120}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Donations"]}
            />

            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "hsl(var(--primary))"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
