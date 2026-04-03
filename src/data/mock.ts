export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Tech Solutions Inc",
    amount: 5000,
    date: "2026-04-01",
    category: "Salary",
    type: "INCOME",
  },
  {
    id: "2",
    name: "Grocery Store",
    amount: 150,
    date: "2026-04-02",
    category: "Food",
    type: "EXPENSE",
  },
  {
    id: "3",
    name: "Apartment Rent",
    amount: 1200,
    date: "2026-04-03",
    category: "Housing",
    type: "EXPENSE",
  },
  {
    id: "4",
    name: "Freelance Design",
    amount: 800,
    date: "2026-04-05",
    category: "Freelance",
    type: "INCOME",
  },
  {
    id: "5",
    name: "Electric Bill",
    amount: 95,
    date: "2026-04-06",
    category: "Utilities",
    type: "EXPENSE",
  },
  {
    id: "6",
    name: "Coffee Shop",
    amount: 12,
    date: "2026-04-07",
    category: "Food",
    type: "EXPENSE",
  },
  {
    id: "7",
    name: "Internet Subscription",
    amount: 60,
    date: "2026-04-08",
    category: "Utilities",
    type: "EXPENSE",
  },
  {
    id: "8",
    name: "Gym Membership",
    amount: 45,
    date: "2026-04-09",
    category: "Health",
    type: "EXPENSE",
  },
  {
    id: "9",
    name: "Dividends",
    amount: 250,
    date: "2026-04-10",
    category: "Investments",
    type: "INCOME",
  },
  {
    id: "10",
    name: "Restaurant Dinner",
    amount: 85,
    date: "2026-04-12",
    category: "Food",
    type: "EXPENSE",
  },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
