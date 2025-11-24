import { Card } from "./ui/card";
import { CreditCard } from "lucide-react";

export function CreditCards() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 border-0 shadow-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-300 text-sm">내 카드</p>
        <CreditCard className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">카드 번호</p>
          <p className="text-xl tracking-wider">•••• •••• •••• 4582</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">만료일</p>
            <p>12/26</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">CVV</p>
            <p>•••</p>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-1">카드 소지자</p>
          <p>홍길동</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">사용 가능 한도</span>
          <span>₩2,500,000</span>
        </div>
      </div>
    </Card>
  );
}
