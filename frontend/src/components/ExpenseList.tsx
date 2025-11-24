import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const expenses = [
  {
    id: 1,
    merchant: "스타벅스 강남점",
    category: "식음료",
    amount: 8500,
    date: "2024-11-23",
    time: "09:30",
  },
  {
    id: 2,
    merchant: "GS25 편의점",
    category: "식음료",
    amount: 4200,
    date: "2024-11-23",
    time: "14:20",
  },
  {
    id: 3,
    merchant: "올리브영 홍대점",
    category: "뷰티",
    amount: 35000,
    date: "2024-11-22",
    time: "18:45",
  },
  {
    id: 4,
    merchant: "교보문고",
    category: "교육/문화",
    amount: 24000,
    date: "2024-11-22",
    time: "16:30",
  },
  {
    id: 5,
    merchant: "쿠팡 온라인",
    category: "쇼핑",
    amount: 67800,
    date: "2024-11-21",
    time: "12:00",
  },
  {
    id: 6,
    merchant: "CGV 영화관",
    category: "엔터테인먼트",
    amount: 15000,
    date: "2024-11-20",
    time: "19:00",
  },
  {
    id: 7,
    merchant: "카페베네",
    category: "식음료",
    amount: 6500,
    date: "2024-11-20",
    time: "15:20",
  },
  {
    id: 8,
    merchant: "네이버페이 - 배달",
    category: "식음료",
    amount: 18900,
    date: "2024-11-19",
    time: "20:30",
  },
];

const categoryColors: Record<string, string> = {
  "식음료": "bg-orange-100 text-orange-700 border-orange-200",
  "뷰티": "bg-pink-100 text-pink-700 border-pink-200",
  "교육/문화": "bg-purple-100 text-purple-700 border-purple-200",
  "쇼핑": "bg-blue-100 text-blue-700 border-blue-200",
  "엔터테인먼트": "bg-green-100 text-green-700 border-green-200",
};

export function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState("");

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm mb-2">이번 주 총 지출</p>
            <h2 className="text-4xl">₩{totalExpense.toLocaleString()}</h2>
          </div>
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8" />
          </div>
        </div>
      </Card>

      {/* Filter Section */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="가맹점 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
            />
          </div>
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
        </div>
      </Card>

      {/* Expense List */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">최근 거래 내역</h3>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-slate-900">{expense.merchant}</p>
                  <Badge className={`text-xs ${categoryColors[expense.category]}`}>
                    {expense.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {expense.date} • {expense.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">
                  ₩{expense.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
