"use client";

import { useAppStore } from "@/store/useAppStore";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { FilterBar } from '@/components/transactions/FilterBar';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { Transaction } from '@/data/mock';
import { useState, useMemo } from 'react';

export default function TransactionsPage() {
  const { transactions } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const handleOpenAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return Array.from(cats);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCat = category === "All" || t.category === category;
      return matchesSearch && matchesCat;
    });
  }, [transactions, searchQuery, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Transactions
        </h1>
        <p className="text-foreground/50 text-sm">
          Manage and view your transaction history.
        </p>
      </div>

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onAddClick={handleOpenAdd}
      />

      <TransactionTable 
        transactions={filteredTransactions} 
        onEditClick={handleOpenEdit} 
      />

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingTx}
      />
    </div>
  );
}
