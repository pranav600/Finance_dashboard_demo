# Finance Dashboard UI 📈

A modern, responsive, and completely frontend-driven Finance Dashboard application. Built to demonstrate high-quality React engineering utilizing advanced theming, localized global state, and dynamic data visualization.

## 🚀 Teck Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom CSS variables for effortless Dark Mode)
- **State Management:** Zustand
- **Icons:** Lucide React
- **Charts:** Recharts

## ✨ Features
- **Frontend-Only Execution:** All mock data operations run entirely in the browser with a simulated backend using Zustand.
- **Dynamic Theming:** Lightning-fast light & dark mode context provider with zero FOUC (Flash of Unstyled Content) on hydration.
- **Role-Based Access Control (RBAC):** Toggle seamlessly between `VIEWER` and `ADMIN` roles using the navbar switcher.
- **Interactive Data Table:** Admins unlock actionable row-level capabilities including editing and deleting transactions.
- **Form Modals:** Beautifully cohesive add and update dialogs for manual local data manipulation.
- **Performant Filtering:** Instantly search and filter records locally using `useMemo` optimization.

## 🏃‍♂️ Running Locally

1. Install generic dependencies:
   ```bash
   npm install
   ```

2. Spin up the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the luxurious result!

## 🔐 Data Architecture
This project intentionally runs without a real database. It utilizes `mock.ts` to hydrate basic transactions alongside client-side React State. The state simulates full CRUD operations as if communicating realistically with a REST API!
