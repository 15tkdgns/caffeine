import { useState } from "react";
import { AgeAnalysis } from "./AgeAnalysis";
import { SpendingAnalytics } from "./SpendingAnalytics";
import { AnalyticsSummary } from "./AnalyticsSummary";
import { BarChart3, Users, FileText } from "lucide-react";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<"age" | "analytics" | "summary">("age");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection("age")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === "age"
                ? "bg-slate-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>연령대별 소비</span>
          </button>
          
          <button
            onClick={() => setActiveSection("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === "analytics"
                ? "bg-slate-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>소비 분석</span>
          </button>
          
          <button
            onClick={() => setActiveSection("summary")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === "summary"
                ? "bg-slate-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>분석 요약</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {activeSection === "age" && <AgeAnalysis />}
          {activeSection === "analytics" && <SpendingAnalytics />}
          {activeSection === "summary" && <AnalyticsSummary />}
        </div>
      </main>
    </div>
  );
}
