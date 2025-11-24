import { useState } from "react";
import { Header } from "./Header";
import { BalanceCard } from "./BalanceCard";
import { QuickActions } from "./QuickActions";
import { SpendingChart } from "./SpendingChart";
import { RecentTransactions } from "./RecentTransactions";
import { CreditCards } from "./CreditCards";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Balance and Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BalanceCard />
          </div>
          <div>
            <CreditCards />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Charts and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart />
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
}
