import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary"
}) {
  return (
    <div className="stat-card flex items-center gap-4 animate-fade-in">
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">{value}</p>

          {trend && (
            <span className="text-success text-sm font-medium">{trend}</span>
          )}
        </div>
      </div>
    </div>
  );
}
