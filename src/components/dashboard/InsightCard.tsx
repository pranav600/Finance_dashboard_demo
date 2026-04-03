import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
}

export function InsightCard({ title, value, description, icon: Icon, colorClass }: InsightCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={cn("h-12 w-12 rounded-full flex items-center justify-center shrink-0", colorClass)}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground/60">{title}</h3>
        <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{value}</p>
        <p className="text-sm text-foreground/50 mt-1">{description}</p>
      </div>
    </div>
  );
}
