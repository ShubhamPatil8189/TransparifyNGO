import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 8000, spend: 5000 },
  { month: "Feb", income: 12000, spend: 8000 },
  { month: "Mar", income: 15000, spend: 10000 },
  { month: "Apr", income: 18000, spend: 12000 },
  { month: "May", income: 22000, spend: 15000 },
  { month: "Jun", income: 20000, spend: 14000 },
  { month: "Jul", income: 23000, spend: 16000 },
  { month: "Aug", income: 25000, spend: 18000 },
  { month: "Sep", income: 24000, spend: 17000 },
  { month: "Oct", income: 26000, spend: 19000 },
  { month: "Nov", income: 28000, spend: 20000 },
  { month: "Dec", income: 30000, spend: 22000 },
];

export function FinancialChart({ data = [] }) {
  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Financial Overview</h3>
        <span className="text-xs bg-muted px-2 py-1 rounded">Last 6 Months</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">Income vs. Spend</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              name="Income"
            />

            <Line
              type="monotone"
              dataKey="spend"
              stroke="hsl(var(--chart-orange))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-orange))", strokeWidth: 2 }}
              name="Spend"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
