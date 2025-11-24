import { Receipt, PieChart, Ticket, Wallet, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface HeaderProps {
  activeTab: "expenses" | "pattern" | "coupons" | "profile";
  setActiveTab: (tab: "expenses" | "pattern" | "coupons" | "profile") => void;
  currentUser?: any;
  onLogout?: () => void;
}

export function Header({ activeTab, setActiveTab, currentUser, onLogout }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl">SmartSpend</h1>
              <p className="text-xs text-gray-400">스마트한 소비 관리</p>
            </div>
          </div>

          {currentUser && (
            <button 
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  {currentUser.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden sm:block">{currentUser.name}</span>
            </button>
          )}
        </div>

        <nav className="flex gap-1 -mb-px">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("expenses")}
            className={`rounded-none rounded-t-lg px-6 py-3 transition-colors ${
              activeTab === "expenses"
                ? "bg-gray-50 text-slate-900 hover:bg-gray-50"
                : "text-gray-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <Receipt className="h-4 w-4 mr-2" />
            지출 내역
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("pattern")}
            className={`rounded-none rounded-t-lg px-6 py-3 transition-colors ${
              activeTab === "pattern"
                ? "bg-gray-50 text-slate-900 hover:bg-gray-50"
                : "text-gray-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <PieChart className="h-4 w-4 mr-2" />
            소비 패턴
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("coupons")}
            className={`rounded-none rounded-t-lg px-6 py-3 transition-colors ${
              activeTab === "coupons"
                ? "bg-gray-50 text-slate-900 hover:bg-gray-50"
                : "text-gray-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <Ticket className="h-4 w-4 mr-2" />
            추천 쿠폰
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("profile")}
            className={`rounded-none rounded-t-lg px-6 py-3 transition-colors ${
              activeTab === "profile"
                ? "bg-gray-50 text-slate-900 hover:bg-gray-50"
                : "text-gray-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <UserIcon className="h-4 w-4 mr-2" />
            내 정보
          </Button>
        </nav>
      </div>
    </header>
  );
}