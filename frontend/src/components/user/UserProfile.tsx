import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User, Mail, Calendar, Settings, LogOut, CreditCard, Bell, Shield } from "lucide-react";
import { useState } from "react";

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
  });

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const stats = [
    { label: "총 지출", value: "₩179,900", icon: CreditCard, color: "bg-blue-100 text-blue-600" },
    { label: "쿠폰 사용", value: "12개", icon: Settings, color: "bg-purple-100 text-purple-600" },
    { label: "가입 기간", value: "10개월", icon: Calendar, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-white/20">
            <AvatarFallback className="bg-blue-600 text-white text-3xl">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl mb-1">{user?.name}</h2>
            <p className="text-gray-300 mb-3">{user?.email}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>가입일: {user?.joinDate}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900">개인 정보</h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-slate-300 text-slate-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              수정
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-slate-900 hover:bg-slate-800"
              >
                저장
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">이름</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="profile-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="profile-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-age">나이</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="profile-age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">설정</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="text-slate-900">알림 설정</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-slate-900">보안 설정</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <span className="text-slate-900">결제 수단 관리</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-6">
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </Card>
    </div>
  );
}
