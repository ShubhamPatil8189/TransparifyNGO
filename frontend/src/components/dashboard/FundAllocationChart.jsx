import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Program Services", value: 65, color: "hsl(var(--chart-teal))" },
  { name: "Administrative", value: 15, color: "hsl(var(--primary))" },
  { name: "Fundraising", value: 10, color: "hsl(var(--chart-green))" },
  { name: "Reserves", value: 10, color: "hsl(var(--chart-red))" },
];

export function FundAllocationChart() {
  return (
    <div className="dashboard-card p-6">
      <h3 className="font-semibold mb-4">Fund Allocation</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center">Current Allocation</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value }) => `${name} (${value}%)`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value) => [`${value}%`, "Allocation"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
