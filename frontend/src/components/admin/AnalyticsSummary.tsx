import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Target, Lightbulb, ArrowRight } from "lucide-react";

const keyInsights = [
  {
    id: 1,
    title: "30대 사용자의 쇼핑 카테고리 소비 급증",
    description: "30대 연령대에서 쇼핑 카테고리 소비가 전월 대비 28% 증가했습니다. 온라인 쇼핑몰 할인 이벤트와 맞물려 소비가 증가한 것으로 분석됩니다.",
    type: "growth",
    impact: "high",
    category: "쇼핑",
  },
  {
    id: 2,
    title: "20대 뷰티 카테고리 지속적 성장",
    description: "20대 사용자의 뷰티 카테고리 소비가 3개월 연속 증가 추세입니다. 평균 월 52만원으로 전 연령대 중 가장 높은 소비를 보이고 있습니다.",
    type: "growth",
    impact: "high",
    category: "뷰티",
  },
  {
    id: 3,
    title: "40-50대 교육/문화 카테고리 관심 증가",
    description: "40-50대의 교육/문화 카테고리 소비가 전월 대비 15% 증가했습니다. 도서 구매와 온라인 강의 결제가 주요 원인입니다.",
    type: "growth",
    impact: "medium",
    category: "교육/문화",
  },
  {
    id: 4,
    title: "저녁 시간대(18-21시) 거래 집중",
    description: "전체 거래의 29%가 저녁 시간대에 발생하고 있습니다. 퇴근 후 온라인 쇼핑과 배달 주문이 주요 원인입니다.",
    type: "trend",
    impact: "medium",
    category: "시간대",
  },
];

const recommendations = [
  {
    id: 1,
    title: "30대 타겟 쇼핑 쿠폰 확대",
    description: "30대 사용자의 쇼핑 소비 증가 추세에 맞춰 쿠폰 발급량을 20% 증대할 것을 권장합니다.",
    priority: "high",
    expectedImpact: "사용자 만족도 15% 증가 예상",
  },
  {
    id: 2,
    title: "20대 뷰티 브랜드 제휴 확대",
    description: "올리브영, 다이소 등 주요 뷰티 브랜드와의 제휴를 확대하여 더 많은 할인 혜택을 제공할 것을 제안합니다.",
    priority: "high",
    expectedImpact: "20대 사용자 유입 20% 증가 예상",
  },
  {
    id: 3,
    title: "저녁 시간대 푸시 알림 강화",
    description: "18-21시 사이 맞춤형 쿠폰 푸시 알림을 강화하여 거래 전환율을 높일 것을 권장합니다.",
    priority: "medium",
    expectedImpact: "거래 전환율 10% 증가 예상",
  },
  {
    id: 4,
    title: "40-50대 교육 콘텐츠 큐레이션",
    description: "40-50대를 위한 교육/문화 카테고리 콘텐츠를 별도로 큐레이션하여 사용자 경험을 개선할 것을 제안합니다.",
    priority: "medium",
    expectedImpact: "40-50대 사용자 만족도 12% 증가 예상",
  },
];

const monthlyStats = {
  totalRevenue: 10900000,
  totalUsers: 11100,
  averageSpending: 982,
  couponUsage: 8456,
  couponConversion: 68.5,
};

export function AnalyticsSummary() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">분석 요약 리포트</h2>
        <p className="text-gray-600">2024년 6월 기준 주요 인사이트 및 권장사항</p>
      </div>

      {/* Executive Summary */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <h3 className="text-xl mb-4">이번 달 핵심 지표</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-gray-300 text-sm mb-1">총 거래액</p>
            <p className="text-2xl">₩{(monthlyStats.totalRevenue / 10000).toFixed(0)}만</p>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">활성 사용자</p>
            <p className="text-2xl">{monthlyStats.totalUsers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">1인당 평균</p>
            <p className="text-2xl">₩{monthlyStats.averageSpending}K</p>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">쿠폰 사용</p>
            <p className="text-2xl">{monthlyStats.couponUsage.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-300 text-sm mb-1">전환율</p>
            <p className="text-2xl">{monthlyStats.couponConversion}%</p>
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <h3 className="text-slate-900">주요 인사이트</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyInsights.map((insight) => (
            <Card key={insight.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`${
                  insight.impact === "high" 
                    ? "bg-red-100 text-red-700 border-red-200" 
                    : "bg-blue-100 text-blue-700 border-blue-200"
                }`}>
                  {insight.impact === "high" ? "높음" : "중간"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {insight.category}
                </Badge>
              </div>
              
              <h4 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                {insight.type === "growth" ? (
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                )}
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-blue-600" />
          <h3 className="text-slate-900">실행 권장사항</h3>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-5 border-l-4 border-l-slate-900 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                </div>
                <Badge className={`${
                  rec.priority === "high"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-yellow-100 text-yellow-700 border-yellow-200"
                }`}>
                  {rec.priority === "high" ? "우선순위 높음" : "우선순위 중간"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3 ml-7">{rec.description}</p>
              <div className="flex items-center gap-2 ml-7 text-sm text-blue-600">
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">{rec.expectedImpact}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Summary */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">다음 단계</h4>
            <p className="text-sm text-gray-700 mb-3">
              이번 달 분석 결과를 바탕으로 4개의 주요 액션 아이템이 도출되었습니다. 
              우선순위 높음 항목 2개를 우선적으로 실행할 것을 권장합니다.
            </p>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                예상 ROI: 18-25%
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                실행 기간: 2-4주
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
