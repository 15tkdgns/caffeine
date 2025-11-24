import { Card } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ageGroupData = [
  { age: "20대", 식음료: 450000, 쇼핑: 680000, 뷰티: 520000, 엔터테인먼트: 380000, "교육/문화": 290000 },
  { age: "30대", 식음료: 580000, 쇼핑: 920000, 뷰티: 420000, 엔터테인먼트: 450000, "교육/문화": 480000 },
  { age: "40대", 식음료: 720000, 쇼핑: 850000, 뷰티: 380000, 엔터테인먼트: 320000, "교육/문화": 620000 },
  { age: "50대", 식음료: 650000, 쇼핑: 580000, 뷰티: 280000, 엔터테인먼트: 250000, "교육/문화": 580000 },
];

const ageDistribution = [
  { name: "20대", value: 2850, color: "#3b82f6" },
  { name: "30대", value: 3420, color: "#8b5cf6" },
  { name: "40대", value: 2980, color: "#ec4899" },
  { name: "50대", value: 1850, color: "#f59e0b" },
];

const categoryColors = {
  식음료: "#f97316",
  쇼핑: "#3b82f6",
  뷰티: "#ec4899",
  엔터테인먼트: "#22c55e",
  "교육/문화": "#a855f7",
};

export function AgeAnalysis() {
  const totalUsers = ageDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">연령대별 소비 분석</h2>
        <p className="text-gray-600">사용자 연령대별 카테고리 소비 패턴을 분석합니다</p>
      </div>

      {/* User Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">연령대별 사용자 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${((value / totalUsers) * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toLocaleString()}명`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">연령대별 통계</h3>
          <div className="space-y-4">
            {ageDistribution.map((age) => (
              <div key={age.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: age.color }}
                    />
                    <span className="font-medium text-slate-900">{age.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {age.value.toLocaleString()}명 ({((age.value / totalUsers) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(age.value / totalUsers) * 100}%`,
                      backgroundColor: age.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category Spending by Age */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">연령대별 카테고리 소비액</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ageGroupData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="age" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `₩${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="식음료" fill={categoryColors.식음료} radius={[4, 4, 0, 0]} />
            <Bar dataKey="쇼핑" fill={categoryColors.쇼핑} radius={[4, 4, 0, 0]} />
            <Bar dataKey="뷰티" fill={categoryColors.뷰티} radius={[4, 4, 0, 0]} />
            <Bar dataKey="엔터테인먼트" fill={categoryColors.엔터테인먼트} radius={[4, 4, 0, 0]} />
            <Bar dataKey="교육/문화" fill={categoryColors["교육/문화"]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ageGroupData.map((ageGroup) => {
          const total = Object.values(ageGroup).reduce((sum: number, val) => 
            typeof val === 'number' ? sum + val : sum, 0
          );
          return (
            <Card key={ageGroup.age} className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <h4 className="text-lg mb-4">{ageGroup.age}</h4>
              <p className="text-3xl mb-4">₩{total.toLocaleString()}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">식음료</span>
                  <span>₩{ageGroup.식음료.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">쇼핑</span>
                  <span>₩{ageGroup.쇼핑.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">뷰티</span>
                  <span>₩{ageGroup.뷰티.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
