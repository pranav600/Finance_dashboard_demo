import { create } from "zustand";
import { Transaction, mockTransactions } from "@/data/mock";

// Define the role type
export type AppRole = "ADMIN" | "VIEWER";

interface AppState {
  role: AppRole;
  transactions: Transaction[];
  setRole: (role: AppRole) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: "VIEWER",
  transactions: mockTransactions,
  setRole: (role) => set({ role }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (id, updatedFields) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
