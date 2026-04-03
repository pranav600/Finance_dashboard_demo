"use client";

import { useAppStore } from "@/store/useAppStore";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/data/mock";

export default function DashboardPage() {
  const { transactions } = useAppStore();

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // Process data for charts
  const balanceData = [
    { name: "Jan", balance: balance * 0.8 },
    { name: "Feb", balance: balance * 0.85 },
    { name: "Mar", balance: balance * 0.9 },
    { name: "Apr", balance: balance },
  ];

  const categories = Object.entries(
    transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      ),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-foreground/50 text-sm">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(balance)}
          icon={Wallet}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Total Income"
          amount={formatCurrency(totalIncome)}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard
          title="Total Expense"
          amount={formatCurrency(totalExpense)}
          icon={TrendingDown}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceChart data={balanceData} />
        </div>
        <div>
          <CategoryChart data={categories} />
        </div>
      </div>
    </div>
  );
}
