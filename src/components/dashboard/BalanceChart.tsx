"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface BalanceChartProps {
  data: { name: string; balance: number }[];
}

export function BalanceChart({ data }: BalanceChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-foreground/5 rounded-lg" />;

  const isDark = theme === "dark";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const tooltipBg = isDark ? "#1e293b" : "#ffffff";

  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Balance Overview</h3>
        <p className="text-sm text-foreground/50">Your account balance over the last months</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px' }}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: tooltipBg }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
