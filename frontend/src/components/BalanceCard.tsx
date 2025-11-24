import { ArrowUpRight, ArrowDownRight, Eye, EyeOff } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 border-0 shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-blue-100 text-sm mb-2">총 잔액</p>
          <div className="flex items-center gap-3">
            {showBalance ? (
              <h2 className="text-4xl">₩12,458,300</h2>
            ) : (
              <h2 className="text-4xl">••••••••</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-green-300" />
            </div>
            <span className="text-sm text-blue-100">이번 달 수입</span>
          </div>
          <p className="text-2xl">₩4,230,000</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-red-300" />
            </div>
            <span className="text-sm text-blue-100">이번 달 지출</span>
          </div>
          <p className="text-2xl">₩1,842,500</p>
        </div>
      </div>
    </Card>
  );
}
