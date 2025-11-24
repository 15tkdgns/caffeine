import { Card } from "./ui/card";
import { ArrowUpRight, ArrowDownRight, ShoppingBag, Coffee, Home, Zap } from "lucide-react";

const transactions = [
  {
    id: 1,
    title: "스타벅스 강남점",
    category: "식음료",
    amount: -5800,
    date: "오늘",
    icon: Coffee,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    title: "월급",
    category: "수입",
    amount: 4230000,
    date: "2일 전",
    icon: ArrowDownRight,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "쿠팡",
    category: "쇼핑",
    amount: -45000,
    date: "3일 전",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "관리비",
    category: "주거",
    amount: -180000,
    date: "5일 전",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    title: "전기요금",
    category: "공과금",
    amount: -62500,
    date: "7일 전",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export function RecentTransactions() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3>최근 거래</h3>
        <button className="text-sm text-blue-600 hover:underline">전체 보기</button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center`}>
                <transaction.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <div className={`text-right ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
              <p className="font-semibold">
                {transaction.amount > 0 ? "+" : ""}₩{Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
