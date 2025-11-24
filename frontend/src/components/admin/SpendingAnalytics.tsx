import { Card } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

const monthlyTrend = [
  { month: "1월", 총소비: 8500000, 사용자수: 8900 },
  { month: "2월", 총소비: 9200000, 사용자수: 9200 },
  { month: "3월", 총소비: 8800000, 사용자수: 9500 },
  { month: "4월", 총소비: 10500000, 사용자수: 10200 },
  { month: "5월", 총소비: 11200000, 사용자수: 10800 },
  { month: "6월", 총소비: 10900000, 사용자수: 11100 },
];

const categoryTrend = [
  { month: "1월", 식음료: 2100000, 쇼핑: 3200000, 뷰티: 1800000, 엔터테인먼트: 900000, "교육/문화": 500000 },
  { month: "2월", 식음료: 2300000, 쇼핑: 3500000, 뷰티: 2000000, 엔터테인먼트: 950000, "교육/문화": 450000 },
  { month: "3월", 식음료: 2200000, 쇼핑: 3300000, 뷰티: 1900000, 엔터테인먼트: 920000, "교육/문화": 480000 },
  { month: "4월", 식음료: 2500000, 쇼핑: 4000000, 뷰티: 2200000, 엔터테인먼트: 1100000, "교육/문화": 700000 },
  { month: "5월", 식음료: 2700000, 쇼핑: 4300000, 뷰티: 2400000, 엔터테인먼트: 1200000, "교육/문화": 600000 },
  { month: "6월", 식음료: 2600000, 쇼핑: 4200000, 뷰티: 2300000, 엔터테인먼트: 1150000, "교육/문화": 650000 },
];

const peakHours = [
  { hour: "6-9시", transactions: 1250 },
  { hour: "9-12시", transactions: 2850 },
  { hour: "12-15시", transactions: 4200 },
  { hour: "15-18시", transactions: 3100 },
  { hour: "18-21시", transactions: 5800 },
  { hour: "21-24시", transactions: 2900 },
];

export function SpendingAnalytics() {
  const currentMonth = monthlyTrend[monthlyTrend.length - 1];
  const previousMonth = monthlyTrend[monthlyTrend.length - 2];
  const spendingGrowth = ((currentMonth.총소비 - previousMonth.총소비) / previousMonth.총소비) * 100;
  const userGrowth = ((currentMonth.사용자수 - previousMonth.사용자수) / previousMonth.사용자수) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">전체 소비 분석</h2>
        <p className="text-gray-600">플랫폼 전체의 소비 트렌드와 패턴을 분석합니다</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100 text-sm">이번 달 총 소비</span>
            <DollarSign className="h-5 w-5" />
          </div>
          <p className="text-3xl mb-2">₩{(currentMonth.총소비 / 10000).toFixed(0)}만</p>
          <div className="flex items-center gap-1 text-sm">
            {spendingGrowth > 0 ? (
              <>
                <TrendingUp className="h-4 w-4" />
                <span>전월 대비 +{spendingGrowth.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4" />
                <span>전월 대비 {spendingGrowth.toFixed(1)}%</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-100 text-sm">활성 사용자</span>
            <Users className="h-5 w-5" />
          </div>
          <p className="text-3xl mb-2">{currentMonth.사용자수.toLocaleString()}명</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>전월 대비 +{userGrowth.toFixed(1)}%</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-100 text-sm">1인당 평균 소비</span>
            <DollarSign className="h-5 w-5" />
          </div>
          <p className="text-3xl mb-2">₩{Math.round(currentMonth.총소비 / currentMonth.사용자수).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            <span>이번 달 기준</span>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">총 거래 건수</span>
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-3xl mb-2">20,150건</p>
          <div className="flex items-center gap-1 text-sm">
            <span>이번 달 기준</span>
          </div>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">월별 소비 추이</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e293b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `₩${value.toLocaleString()}`}
            />
            <Area type="monotone" dataKey="총소비" stroke="#1e293b" fillOpacity={1} fill="url(#colorSpending)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Trend */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">카테고리별 소비 추이</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={categoryTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#64748b" />
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
            <Line type="monotone" dataKey="식음료" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="쇼핑" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="뷰티" stroke="#ec4899" strokeWidth={2} />
            <Line type="monotone" dataKey="엔터테인먼트" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="교육/문화" stroke="#a855f7" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Peak Hours */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">시간대별 거래량</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={peakHours}>
            <defs>
              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}건`, "거래량"]}
            />
            <Area type="monotone" dataKey="transactions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTransactions)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
