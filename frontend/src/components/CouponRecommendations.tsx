import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Gift, Clock, Star, Download } from "lucide-react";
import { useState } from "react";

const coupons = [
  {
    id: 1,
    title: "스타벅스 아메리카노 50% 할인",
    category: "식음료",
    discount: "50%",
    brand: "스타벅스",
    expiryDays: 7,
    description: "아메리카노 전 사이즈 50% 할인",
    minPurchase: 0,
    recommended: true,
  },
  {
    id: 2,
    title: "올리브영 전품목 15% 할인",
    category: "뷰티",
    discount: "15%",
    brand: "올리브영",
    expiryDays: 14,
    description: "3만원 이상 구매 시",
    minPurchase: 30000,
    recommended: true,
  },
  {
    id: 3,
    title: "쿠팡 무료배송 쿠폰",
    category: "쇼핑",
    discount: "배송비",
    brand: "쿠팡",
    expiryDays: 30,
    description: "로켓배송 무료",
    minPurchase: 0,
    recommended: true,
  },
  {
    id: 4,
    title: "CGV 영화 관람권 2,000원 할인",
    category: "엔터테인먼트",
    discount: "₩2,000",
    brand: "CGV",
    expiryDays: 21,
    description: "평일 조조 상영",
    minPurchase: 0,
    recommended: false,
  },
  {
    id: 5,
    title: "교보문고 도서 10% 할인",
    category: "교육/문화",
    discount: "10%",
    brand: "교보문고",
    expiryDays: 10,
    description: "전 도서 10% 할인",
    minPurchase: 10000,
    recommended: true,
  },
  {
    id: 6,
    title: "카페베네 음료 2+1",
    category: "식음료",
    discount: "1+1",
    brand: "카페베네",
    expiryDays: 5,
    description: "아메리카노 및 라떼 한정",
    minPurchase: 0,
    recommended: false,
  },
];

const categoryColors: Record<string, string> = {
  "식음료": "bg-orange-100 text-orange-700 border-orange-200",
  "뷰티": "bg-pink-100 text-pink-700 border-pink-200",
  "교육/문화": "bg-purple-100 text-purple-700 border-purple-200",
  "쇼핑": "bg-blue-100 text-blue-700 border-blue-200",
  "엔터테인먼트": "bg-green-100 text-green-700 border-green-200",
};

export function CouponRecommendations() {
  const [downloadedCoupons, setDownloadedCoupons] = useState<number[]>([]);

  const handleDownload = (couponId: number) => {
    setDownloadedCoupons([...downloadedCoupons, couponId]);
  };

  const recommendedCoupons = coupons.filter((c) => c.recommended);
  const otherCoupons = coupons.filter((c) => !c.recommended);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 border-0">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl mb-2">맞춤 쿠폰 추천</h3>
            <p className="text-gray-300 text-sm">
              최근 소비 패턴을 분석하여 가장 많이 사용하는 카테고리의 쿠폰을 추천해드립니다.
            </p>
          </div>
        </div>
      </Card>

      {/* Recommended Coupons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <h3 className="text-slate-900">추천 쿠폰</h3>
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            소비 패턴 기반
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedCoupons.map((coupon) => (
            <Card
              key={coupon.id}
              className="p-5 border-2 border-blue-200 bg-blue-50/30 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className={`text-xs ${categoryColors[coupon.category]}`}>
                  {coupon.category}
                </Badge>
                <span className="text-2xl font-bold text-blue-600">{coupon.discount}</span>
              </div>
              
              <h4 className="font-semibold text-slate-900 mb-2">{coupon.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{coupon.brand}</p>
              <p className="text-sm text-gray-500 mb-4">{coupon.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{coupon.expiryDays}일 남음</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleDownload(coupon.id)}
                  disabled={downloadedCoupons.includes(coupon.id)}
                  className={`${
                    downloadedCoupons.includes(coupon.id)
                      ? "bg-gray-400"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {downloadedCoupons.includes(coupon.id) ? (
                    "발급 완료"
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      쿠폰 발급
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Coupons */}
      <div>
        <h3 className="text-slate-900 mb-4">기타 쿠폰</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherCoupons.map((coupon) => (
            <Card key={coupon.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`text-xs ${categoryColors[coupon.category]}`}>
                  {coupon.category}
                </Badge>
                <span className="text-2xl font-bold text-gray-700">{coupon.discount}</span>
              </div>
              
              <h4 className="font-semibold text-slate-900 mb-2">{coupon.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{coupon.brand}</p>
              <p className="text-sm text-gray-500 mb-4">{coupon.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{coupon.expiryDays}일 남음</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(coupon.id)}
                  disabled={downloadedCoupons.includes(coupon.id)}
                  className="border-slate-300 text-slate-700"
                >
                  {downloadedCoupons.includes(coupon.id) ? (
                    "발급 완료"
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      쿠폰 발급
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
