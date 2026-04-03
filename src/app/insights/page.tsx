"use client";

import { useAppStore } from "@/store/useAppStore";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { formatCurrency } from "@/data/mock";
import { AlertCircle, Tag, TrendingDown, TrendingUp } from "lucide-react";

export default function InsightsPage() {
  const { transactions } = useAppStore();

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const categoryExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  const topCategory = Object.entries(categoryExpenses).sort(
    (a, b) => b[1] - a[1],
  )[0] || ["None", 0];

  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Financial Insights
        </h1>
        <p className="text-foreground/50 text-sm">
          Actionable insights from your transaction data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <InsightCard
          title="Highest Cost Category"
          value={topCategory[0]}
          description={`You spent ${formatCurrency(topCategory[1])} on this category.`}
          icon={Tag}
          colorClass="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
        />

        <InsightCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          description={
            savingsRate >= 20
              ? "Great! You are saving >20%."
              : "Try to lower your expenses to save more!"
          }
          icon={TrendingUp}
          colorClass={
            savingsRate >= 20
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          }
        />

        <InsightCard
          title="Total Cash Flow"
          value={formatCurrency(totalIncome - totalExpense)}
          description="Total income minus expenses across all data."
          icon={AlertCircle}
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        />

        <InsightCard
          title="Expense to Income Ratio"
          value={`${((totalExpense / (totalIncome || 1)) * 100).toFixed(1)}%`}
          description="Percentage of income going to expenses."
          icon={TrendingDown}
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
      </div>
    </div>
  );
}
