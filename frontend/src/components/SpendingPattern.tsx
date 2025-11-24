import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const categoryData = [
  { name: "식음료", value: 38100, percentage: 21.3, color: "#f97316" },
  { name: "쇼핑", value: 67800, percentage: 37.9, color: "#3b82f6" },
  { name: "뷰티", value: 35000, percentage: 19.6, color: "#ec4899" },
  { name: "교육/문화", value: 24000, percentage: 13.4, color: "#a855f7" },
  { name: "엔터테인먼트", value: 15000, percentage: 8.4, color: "#22c55e" },
];

const weeklyData = [
  { week: "1주차", amount: 145000 },
  { week: "2주차", amount: 178900 },
  { week: "3주차", amount: 134500 },
  { week: "4주차", amount: 179900 },
];

export function SpendingPattern() {
  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.value, 0);
  const topCategory = categoryData.reduce((prev, current) => 
    current.value > prev.value ? current : prev
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <p className="text-gray-300 text-sm mb-2">이번 달 총 소비</p>
          <h3 className="text-3xl mb-2">₩{totalSpending.toLocaleString()}</h3>
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <TrendingDown className="h-4 w-4" />
            <span>지난 달 대비 8% 감소</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <p className="text-blue-100 text-sm mb-2">최다 소비 카테고리</p>
          <h3 className="text-3xl mb-2">{topCategory.name}</h3>
          <p className="text-sm">전체의 {topCategory.percentage}%</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gray-600 to-gray-700 text-white">
          <p className="text-gray-200 text-sm mb-2">일평균 소비</p>
          <h3 className="text-3xl mb-2">₩{Math.round(totalSpending / 30).toLocaleString()}</h3>
          <div className="flex items-center gap-1 text-red-400 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>전주 대비 5% 증가</span>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-6">카테고리별 소비 분석</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-slate-900">{category.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    ₩{category.value.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Weekly Trend */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-6">주간 소비 추이</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`₩${value.toLocaleString()}`, "소비액"]}
            />
            <Bar dataKey="amount" fill="#1e293b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
