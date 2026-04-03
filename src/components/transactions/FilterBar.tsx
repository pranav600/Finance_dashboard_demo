"use client";

import { Search, Filter } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  categories: string[];
  onAddClick: () => void;
}

export function FilterBar({ searchQuery, setSearchQuery, category, setCategory, categories, onAddClick }: FilterBarProps) {
  const { role } = useAppStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
      <div className="flex flex-1 w-full sm:w-auto items-center gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-card pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 appearance-none rounded-lg border border-border bg-card pl-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-3 h-4 w-4 text-foreground/40 pointer-events-none" />
        </div>
      </div>
      
      {role === 'ADMIN' && (
        <button onClick={onAddClick} className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap hidden sm:block">
          Add Transaction
        </button>
      )}
    </div>
  );
}
