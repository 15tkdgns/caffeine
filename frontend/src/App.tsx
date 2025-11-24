import { useState } from "react";
import { Header } from "./components/Header";
import { ExpenseList } from "./components/ExpenseList";
import { SpendingPattern } from "./components/SpendingPattern";
import { CouponRecommendations } from "./components/CouponRecommendations";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { UserProfile } from "./components/user/UserProfile";
import { Button } from "./components/ui/button";
import { Shield, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"expenses" | "pattern" | "coupons" | "profile">("expenses");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | null>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setAuthView(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthView("login");
    setIsAdminMode(false);
  };

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authView === "login") {
      return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView("signup")} />;
    }
    if (authView === "signup") {
      return <SignupPage onSignup={handleLogin} onSwitchToLogin={() => setAuthView("login")} />;
    }
  }

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl">관리자 대시보드</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsAdminMode(false)}
              className="text-white hover:bg-slate-700"
            >
              <User className="h-4 w-4 mr-2" />
              사용자 모드로 전환
            </Button>
          </div>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdminMode(true)}
            className="border-slate-300 text-slate-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            관리자 모드
          </Button>
        </div>
        
        {activeTab === "expenses" && <ExpenseList />}
        {activeTab === "pattern" && <SpendingPattern />}
        {activeTab === "coupons" && <CouponRecommendations />}
        {activeTab === "profile" && <UserProfile user={currentUser} onLogout={handleLogout} />}
      </main>
    </div>
  );
}