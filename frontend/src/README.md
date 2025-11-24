# SmartSpend - 금융 애플리케이션

네이비와 회색 색상을 중심으로 한 현대적이고 전문적인 금융 관리 애플리케이션입니다.

## 📋 주요 기능

### 사용자 기능
1. **지출 내역 보기** - 실시간 거래 내역 조회 및 검색
2. **소비 패턴 분석** - 카테고리별 소비 통계 및 차트 시각화
3. **쿠폰 추천** - AI 기반 맞춤형 쿠폰 추천 및 발급
4. **사용자 프로필** - 개인정보 관리 및 설정

### 관리자 기능
1. **연령대별 소비 분석** - 20대~50대 연령층의 카테고리별 소비 패턴
2. **전체 소비 분석** - 월별 트렌드, 시간대별 거래량 분석
3. **분석 요약 리포트** - 핵심 인사이트 및 실행 권장사항

## 🗂 프로젝트 구조

```
/
├── App.tsx                              # 메인 애플리케이션
├── styles/
│   └── globals.css                      # 전역 스타일 및 CSS 변수
├── components/
│   ├── Header.tsx                       # 네비게이션 헤더
│   ├── ExpenseList.tsx                  # 지출 내역 컴포넌트
│   ├── SpendingPattern.tsx              # 소비 패턴 컴포넌트
│   ├── CouponRecommendations.tsx        # 쿠폰 추천 컴포넌트
│   ├── auth/
│   │   ├── LoginPage.tsx                # 로그인 페이지
│   │   └── SignupPage.tsx               # 회원가입 페이지
│   ├── user/
│   │   └── UserProfile.tsx              # 사용자 프로필
│   ├── admin/
│   │   ├── AdminDashboard.tsx           # 관리자 대시보드
│   │   ├── AgeAnalysis.tsx              # 연령대별 분석
│   │   ├── SpendingAnalytics.tsx        # 소비 분석
│   │   └── AnalyticsSummary.tsx         # 분석 요약
│   └── ui/                              # UI 컴포넌트 라이브러리
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Slate-900 (네이비)
- **Secondary**: Blue-600
- **Accent**: Gray 계열
- **카테고리 색상**:
  - 식음료: Orange
  - 쇼핑: Blue
  - 뷰티: Pink
  - 교육/문화: Purple
  - 엔터테인먼트: Green

### 주요 라이브러리
- React
- Tailwind CSS
- Recharts (차트 시각화)
- Lucide React (아이콘)

## 🚀 시작하기

### Demo 로그인
- 아무 이메일과 비밀번호로 로그인 가능합니다
- 예: `test@example.com` / `password123`

### 주요 네비게이션
1. **사용자 모드**
   - 지출 내역: 최근 거래 내역 및 검색
   - 소비 패턴: 카테고리별 분석 및 차트
   - 추천 쿠폰: 맞춤형 쿠폰 발급
   - 내 정보: 프로필 관리

2. **관리자 모드**
   - 우측 상단 "관리자 모드" 버튼 클릭
   - 연령대별 소비, 소비 분석, 분석 요약 확인

## 📊 데이터 구조

### 지출 내역
```typescript
{
  id: number;
  merchant: string;      // 가맹점명
  category: string;      // 카테고리
  amount: number;        // 금액
  date: string;          // 날짜
  time: string;          // 시간
}
```

### 쿠폰
```typescript
{
  id: number;
  title: string;         // 쿠폰명
  category: string;      // 카테고리
  discount: string;      // 할인율/금액
  brand: string;         // 브랜드
  expiryDays: number;    // 유효기간
  description: string;   // 설명
  minPurchase: number;   // 최소 구매금액
  recommended: boolean;  // 추천 여부
}
```

## 🔐 인증 시스템

- 로그인/회원가입 기능 구현
- 세션 기반 사용자 인증
- 사용자 프로필 관리
- 로그아웃 기능

## 📈 분석 기능

### 사용자 분석
- 카테고리별 소비 비율
- 주간/월간 소비 추이
- 일평균 소비액

### 관리자 분석
- 연령대별 사용자 분포
- 연령대별 카테고리 소비 패턴
- 월별 전체 소비 트렌드
- 시간대별 거래량 분석
- 핵심 인사이트 및 권장사항

## 🎯 향후 개선사항

1. **백엔드 연동**: Supabase 등을 통한 실제 데이터베이스 연결
2. **결제 시스템**: 실제 결제 API 연동
3. **푸시 알림**: 쿠폰 및 소비 알림 기능
4. **고급 필터**: 날짜, 금액, 카테고리별 세부 필터
5. **데이터 내보내기**: CSV/Excel 형식으로 데이터 다운로드
6. **다크 모드**: 사용자 선호도에 따른 테마 전환

## 📱 반응형 디자인

- 모바일, 태블릿, 데스크톱 지원
- Grid 레이아웃을 활용한 유연한 UI
- 터치 친화적인 인터랙션

## 💡 개발 팁

1. **Mock 데이터**: 현재는 하드코딩된 데이터를 사용 중입니다
2. **컴포넌트 재사용**: `/components/ui` 폴더의 재사용 가능한 컴포넌트 활용
3. **타입 안정성**: TypeScript 인터페이스 정의 권장
4. **스타일 일관성**: Tailwind CSS 유틸리티 클래스 사용

## 📄 라이선스

이 프로젝트는 데모 목적으로 제작되었습니다.

---

**SmartSpend** - 스마트한 소비 관리의 시작
