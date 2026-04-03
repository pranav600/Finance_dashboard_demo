"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

interface CategoryChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#6366f1'];

export function CategoryChart({ data }: CategoryChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-foreground/5 rounded-lg" />;

  const isDark = theme === "dark";
  const tooltipBg = isDark ? "#1e293b" : "#ffffff";
  const gridColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Spending by Category</h3>
        <p className="text-sm text-foreground/50">Your expenses broken down</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px' }}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
              formatter={(value: any) => `$${value}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
