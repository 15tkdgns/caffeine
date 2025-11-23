import React, { useState, useMemo } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, ShoppingBag, Coffee, Utensils, Car, Home, Zap, ChevronLeft, ChevronRight, Wallet, BarChart3 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateSampleTransactions = () => {
  const categories = ['식비', '카페', '쇼핑', '교통', '주거', '유틸리티'];
  const merchants = {
    '식비': ['올리브영 레스토랑', '맥도날드', '김밥천국', '스시로'],
    '카페': ['스타벅스', '투썸플레이스', '이디야커피', '카페베네'],
    '쇼핑': ['쿠팡', '무신사', '올리브영', 'GS25'],
    '교통': ['카카오T', '서울교통공사', 'SK주유소', '현대오일뱅크'],
    '주거': ['아파트관리비', '월세', '부동산중개'],
    '유틸리티': ['한국전력', '서울시상수도', 'SK텔레콤', 'KT']
  };
  
  const transactions = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  
  // 월급 (월 1회)
  const salaryDate = new Date(now.getFullYear(), currentMonth, 25);
  transactions.push({
    id: 'salary',
    date: salaryDate.toISOString().split('T')[0],
    time: '09:00',
    merchant: '급여입금',
    category: '수입',
    amount: 3000000,
    isAnomaly: false,
    isIncome: true
  });
  
  // 고정 지출 (월세, 관리비 등)
  const rentDate = new Date(now.getFullYear(), currentMonth, 1);
  transactions.push({
    id: 'rent',
    date: rentDate.toISOString().split('T')[0],
    time: '00:01',
    merchant: '월세',
    category: '주거',
    amount: 700000,
    isAnomaly: false,
    isIncome: false
  });
  
  // 일반 거래 생성 (최근 60일)
  let transactionId = 1;
  for (let i = 0; i < 60; i++) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000 - Math.random() * 12 * 60 * 60 * 1000);
    
    // 하루에 1-4개 거래
    const numTransactions = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < numTransactions; j++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const merchant = merchants[category][Math.floor(Math.random() * merchants[category].length)];
      
      let amount = 0;
      let isAnomaly = false;
      
      const normalRanges = {
        '식비': [8000, 25000],
        '카페': [4500, 7500],
        '쇼핑': [15000, 50000],
        '교통': [2000, 15000],
        '주거': [50000, 150000],
        '유틸리티': [30000, 80000]
      };
      
      // 5% 확률로 이상거래
      if (Math.random() < 0.05) {
        isAnomaly = true;
        amount = normalRanges[category][1] * (2.5 + Math.random() * 1.5);
      } else {
        const range = normalRanges[category];
        amount = range[0] + Math.random() * (range[1] - range[0]);
      }
      
      transactions.push({
        id: transactionId++,
        date: date.toISOString().split('T')[0],
        time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        merchant,
        category,
        amount: Math.round(amount),
        isAnomaly,
        isIncome: false
      });
    }
  }
  
  return transactions.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
};

const StatCard = ({ icon: Icon, label, value, subValue, trend, bgGradient, iconColor }) => (
  <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${bgGradient}`}>
        <Icon className={iconColor} size={24} strokeWidth={2.5} />
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          trend > 0 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    {subValue && <p className="text-xs text-gray-400">{subValue}</p>}
  </div>
);

const TransactionItem = ({ transaction, categoryIcons }) => {
  const Icon = transaction.isIncome ? TrendingUp : categoryIcons[transaction.category];
  const bgColor = transaction.isAnomaly ? 'bg-red-50' : 
                  transaction.isIncome ? 'bg-blue-50' : 'bg-white';
  const borderColor = transaction.isAnomaly ? 'border-red-200' : 
                      transaction.isIncome ? 'border-blue-200' : 'border-gray-100';
  const iconBg = transaction.isAnomaly ? 'bg-red-100' : 
                 transaction.isIncome ? 'bg-blue-100' : 'bg-gray-50';
  const iconColor = transaction.isAnomaly ? 'text-red-600' : 
                    transaction.isIncome ? 'text-blue-600' : 'text-gray-700';
  const amountColor = transaction.isIncome ? 'text-blue-600' :
                      transaction.isAnomaly ? 'text-red-600' : 'text-gray-900';
  
  return (
    <div className={`${bgColor} rounded-2xl border ${borderColor} p-4 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon size={20} className={iconColor} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{transaction.merchant}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">{transaction.date}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{transaction.category}</span>
            </div>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className={`text-lg font-bold ${amountColor}`}>
            {transaction.isIncome ? '+' : '-'}{transaction.amount.toLocaleString()}
          </p>
          {transaction.isAnomaly && (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold mt-1">
              <AlertCircle size={12} />
              이상거래
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const CalendarDay = ({ day }) => {
  const hasActivity = day.income > 0 || day.expense > 0;
  
  return (
    <div className={`min-h-28 p-2 rounded-xl transition-all ${
      day.isCurrentMonth 
        ? hasActivity ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-50 hover:bg-white'
        : 'bg-gray-50 opacity-40'
    }`}>
      <div className={`text-sm font-bold mb-1.5 ${
        day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
      }`}>
        {day.date.getDate()}
      </div>
      {day.income > 0 && (
        <div className="text-[9px] font-bold text-blue-600 mb-0.5 whitespace-nowrap">
          +{day.income.toLocaleString()}
        </div>
      )}
      {day.expense > 0 && (
        <div className="text-[9px] font-bold text-red-600 whitespace-nowrap">
          -{day.expense.toLocaleString()}
        </div>
      )}
    </div>
  );
};

const CategoryBreakdown = ({ category, index, total, colors }) => {
  const percentage = ((category.value / total) * 100).toFixed(1);
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
        <span className="font-semibold text-gray-900">{category.name}</span>
        <div className="flex-1 mx-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${percentage}%`,
                backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-right ml-4">
        <p className="font-bold text-gray-900">{category.value.toLocaleString()}원</p>
        <p className="text-sm text-gray-500 font-semibold">{percentage}%</p>
      </div>
    </div>
  );
};

const App = () => {
  const [transactions] = useState(generateSampleTransactions());
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('dashboard');
  
  const categoryIcons = {
    '식비': Utensils,
    '카페': Coffee,
    '쇼핑': ShoppingBag,
    '교통': Car,
    '주거': Home,
    '유틸리티': Zap
  };
  
  const stats = useMemo(() => {
    const total = transactions.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
    const income = transactions.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
    const anomalies = transactions.filter(t => t.isAnomaly);
    const categorySpending = {};
    
    transactions.filter(t => !t.isIncome).forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });
    
    const topCategory = Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      total,
      income,
      anomalyCount: anomalies.length,
      categorySpending,
      topCategory: topCategory ? topCategory[0] : '없음'
    };
  }, [transactions]);
  
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (days.length < 42) {
      const dateStr = current.toISOString().split('T')[0];
      const dayTransactions = transactions.filter(t => t.date === dateStr);
      const income = dayTransactions.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTransactions.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
      
      days.push({
        date: new Date(current),
        dateStr,
        income,
        expense,
        isCurrentMonth: current.getMonth() === month
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentMonth, transactions]);
  
  const monthlyTrend = useMemo(() => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, 지출: 0, 수입: 0 };
      }
      
      if (t.isIncome) {
        monthlyData[monthKey].수입 += t.amount;
      } else {
        monthlyData[monthKey].지출 += t.amount;
      }
    });
    
    return Object.values(monthlyData)
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  }, [transactions]);
  
  const categoryPieData = useMemo(() => {
    return Object.entries(stats.categorySpending)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [stats.categorySpending]);
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  const filteredTransactions = selectedCategory === '전체' 
    ? transactions 
    : transactions.filter(t => t.category === selectedCategory);
  
  const categories = ['전체', ...Object.keys(stats.categorySpending)];
  
  const changeMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };
  
  const viewButtons = [
    { id: 'dashboard', label: '홈', icon: Wallet },
    { id: 'calendar', label: '캘린더', icon: BarChart3 },
    { id: 'charts', label: '분석', icon: TrendingUp }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Coffee className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">카페인</h1>
                <p className="text-xs text-gray-500">Card Payment Insight</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {viewButtons.map(btn => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setView(btn.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                    view === btn.id 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={TrendingUp}
            label="이번 달 수입"
            value={`${stats.income.toLocaleString()}원`}
            subValue="전월 대비 +5%"
            trend={5}
            bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard 
            icon={TrendingDown}
            label="이번 달 지출"
            value={`${stats.total.toLocaleString()}원`}
            subValue="전월 대비 -12%"
            trend={-12}
            bgGradient="bg-gradient-to-br from-gray-50 to-gray-100"
            iconColor="text-gray-700"
          />
          <StatCard 
            icon={Wallet}
            label="순 잔액"
            value={`${(stats.income - stats.total).toLocaleString()}원`}
            subValue="저축 가능 금액"
            bgGradient="bg-gradient-to-br from-green-50 to-green-100"
            iconColor="text-green-600"
          />
          <StatCard 
            icon={AlertCircle}
            label="이상거래"
            value={`${stats.anomalyCount}건`}
            subValue="확인 필요"
            bgGradient="bg-gradient-to-br from-red-50 to-red-100"
            iconColor="text-red-600"
          />
        </div>
        
        {/* 대시보드 뷰 */}
        {view === 'dashboard' && (
          <>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-500 text-white shadow-md scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">최근 거래</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredTransactions.slice(0, 30).map(transaction => (
                  <TransactionItem 
                    key={transaction.id}
                    transaction={transaction}
                    categoryIcons={categoryIcons}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* 캘린더 뷰 */}
        {view === 'calendar' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors"
                >
                  오늘
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="text-center font-bold text-gray-500 py-3 text-sm">
                  {day}
                </div>
              ))}
              {calendarData.map((day, idx) => (
                <CalendarDay key={idx} day={day} />
              ))}
            </div>
          </div>
        )}
        
        {/* 통계 분석 뷰 */}
        {view === 'charts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">월별 수입/지출 추세</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    formatter={(value) => `${(value / 10000).toFixed(0)}만원`}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="수입" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="지출" fill="#6B7280" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">카테고리별 지출 분석</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value.toLocaleString()}원`}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {categoryPieData.map((cat, idx) => (
                    <CategoryBreakdown 
                      key={cat.name}
                      category={cat}
                      index={idx}
                      total={stats.total}
                      colors={COLORS}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;