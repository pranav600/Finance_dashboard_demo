"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Transaction } from "@/data/mock";
import { Trash2, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/data/mock";

interface TransactionTableProps {
  transactions: Transaction[];
  onEditClick: (tx: Transaction) => void;
}

export function TransactionTable({
  transactions,
  onEditClick,
}: TransactionTableProps) {
  const { role, deleteTransaction } = useAppStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deletingId) {
      deleteTransaction(deletingId);
      setDeletingId(null);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card text-foreground/50">
        No transactions found matching your criteria.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-foreground/60 uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                {role === "ADMIN" && (
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-foreground/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/70">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {tx.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "font-semibold",
                        tx.type === "INCOME"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground",
                      )}>
                      {tx.type === "INCOME" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {role === "ADMIN" && (
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => onEditClick(tx)}
                        className="p-1.5 text-foreground/40 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 inline-flex">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(tx.id)}
                        className="p-1.5 text-foreground/40 hover:text-rose-600 transition-colors rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10 inline-flex">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[1rem] bg-card p-6 shadow-2xl border border-border zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Delete Transaction
            </h3>
            <p className="text-foreground/70 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
