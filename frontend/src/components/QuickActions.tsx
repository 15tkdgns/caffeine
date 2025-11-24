import { Send, Download, CreditCard, PieChart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const actions = [
  { icon: Send, label: "송금", color: "bg-blue-500" },
  { icon: Download, label: "입금", color: "bg-green-500" },
  { icon: CreditCard, label: "결제", color: "bg-purple-500" },
  { icon: PieChart, label: "분석", color: "bg-orange-500" },
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="mb-4">빠른 액션</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
