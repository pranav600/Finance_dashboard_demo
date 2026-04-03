import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: string;
  trend?: { value: number; isPositive: boolean };
  icon: LucideIcon;
  className?: string;
}

export function SummaryCard({ title, amount, trend, icon: Icon, className }: SummaryCardProps) {
  return (
    <div className={cn("p-6 rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/60">{title}</h3>
        <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{amount}</h2>
        {trend && (
          <p className="mt-2 text-sm flex items-center gap-1.5">
            <span className={cn(
              "font-medium rounded-full px-2 py-0.5 text-xs",
              trend.isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
            )}>
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-foreground/50">vs last month</span>
          </p>
        )}
      </div>
    </div>
  );
}
