import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "1월", amount: 1200000 },
  { month: "2월", amount: 1580000 },
  { month: "3월", amount: 1320000 },
  { month: "4월", amount: 1890000 },
  { month: "5월", amount: 1650000 },
  { month: "6월", amount: 1842500 },
];

export function SpendingChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3>월별 지출</h3>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2024년</option>
          <option>2023년</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#999" fontSize={12} />
          <YAxis stroke="#999" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`₩${value.toLocaleString()}`, "지출"]}
          />
          <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
