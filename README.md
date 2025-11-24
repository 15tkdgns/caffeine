# SmartSpend - 금융 애플리케이션

네이비와 회색 색상을 중심으로 한 현대적이고 전문적인 금융 관리 애플리케이션입니다.

## 📋 주요 기능

### 사용자 기능
1. **지출 내역 보기** - 실시간 거래 내역 조회 및 검색
2. **소비 패턴 분석** - 카테고리별 소비 통계 및 차트 시각화
3. **쿠폰 추천** - AI 기반 맞춤형 쿠폰 추천 및 발급
4. **사용자 프로필** - 개인정보 관리 및 설정
=======

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
=======



</div>
📋 프로젝트 소개

카페인(Caffeine) 은 신용카드 거래 데이터를 기반으로 사용자의 소비 흐름을 분석하고,
이상거래를 자동으로 탐지·시각화하는 대시보드형 웹 앱입니다.

주요 기능:

🚨 이상거래 자동 탐지

📊 카테고리별 소비 분석

📅 월별 캘린더 지출 뷰

📈 월별 수입/지출 추세 차트

🔄 MOCK 데이터 / 실제 API 자동 전환

⚙️ CI 환경에서 테스트·빌드 자동화

백엔드 연동 전 단계에서도 더미 데이터 기반으로 완전한 UI/UX 테스트가 가능합니다.

🎨 주요 기능 소개
1️⃣ 대시보드(Dashboard)

이번 달 수입 / 지출 / 순지출 / 이상거래 건수 통계 카드

카테고리 필터 UI

최근 거래 리스트
→ 수입·지출·이상거래에 따라 색상/스타일 자동 구분

2️⃣ 캘린더(Calendar)

6 × 7 = 42칸 월간 캘린더

각 날짜의 총 지출/수입 표시

이전/다음/오늘 이동 기능 지원

3️⃣ 통계(Charts)

월별 추세 (BarChart)

카테고리별 파이차트 + 퍼센트 바 + 상세 합계

4️⃣ 이상거래 탐지

MOCK 데이터 또는 백엔드 API에서 제공한
isAnomaly: true 거래를 자동 표시

빨간 배지로 강조

리스트에서 상단 우선 정렬 가능 (옵션)

⚙️ 최신 리팩토링 / 구조 개편

기존에는 App.js 하나에 UI + 로직이 모두 포함되어 있었지만,
리팩토링 후 크게 4개의 폴더 구조로 분리되었습니다.

src/
 ├── components/   # UI 컴포넌트 (작은 단위)
 ├── views/        # 화면 단위 컴포넌트
 ├── hooks/        # 통계/계산 로직 custom hooks
 ├── utils/        # 더미 데이터 등 유틸
 ├── App.js        # 라우팅/상태 조립만 담당
 └── index.jsx

📌 핵심 변경점
✔ 1. 모든 계산 로직 → custom hook 분리

useStats, useCalendar, useMonthlyTrend, useCategoryPieData
→ App.js는 상태 관리 + 뷰 연결만 담당 (100줄 이하 유지)

✔ 2. Tailwind CSS 3.x 완전 적용 (Vite 기반)

최신 Tailwind 4 문제를 해결하기 위해
Tailwind 3.x로 고정 설치해 안정적 동작 보장

index.css는 Tailwind 지시자만 유지:

**SmartSpend** - 스마트한 소비 관리의 시작
=======
@tailwind base;
@tailwind components;
@tailwind utilities;

✔ 3. .env 기반 MOCK / 실제 API 자동 전환
REACT_APP_USE_MOCK=true


→ true: 더미데이터 사용
→ false: 백엔드 API 사용

✔ 4. GitHub Actions CI에서 .env 자동 생성

CI 환경에서 아래처럼 .env 자동 생성:

- name: Create .env for CI
  working-directory: ./frontend
  run: echo "REACT_APP_USE_MOCK=true" > .env

🏗 상세 폴더 구조
frontend/
├── public/
├── src/
│   ├── components/
│   │    ├── TopNav.jsx
│   │    ├── StatsSection.jsx
│   │    └── StatCard.jsx
│   ├── views/
│   │    ├── DashboardView.jsx
│   │    ├── CalendarView.jsx
│   │    └── ChartsView.jsx
│   ├── hooks/
│   │    ├── useStats.js
│   │    ├── useCalendar.js
│   │    ├── useMonthlyTrend.js
│   │    └── useCategoryPieData.js
│   ├── utils/
│   │    └── generateSampleTransactions.js
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

🚀 로컬 실행 방법 (최신 버전 기준)

Vite 기반이므로 실행 명령어는 npm start가 아니라 npm run dev 입니다.

1. 저장소 클론
git clone https://github.com/your-repo/caffeine.git
cd caffeine/frontend

2. 환경 변수 설정

frontend/.env 생성:

REACT_APP_USE_MOCK=true

3. 패키지 설치
npm install

4. 개발 서버 실행
npm run dev


접속 주소(기본):

http://localhost:3000

🧪 CI (GitHub Actions)

CI는 아래 흐름으로 동작:

저장소 checkout

Node 18 세팅 + npm 캐시

frontend/ 에서 npm ci

.env 자동 생성 (MOCK 모드)

eslint/test/build 순서로 수행

→ 백엔드가 없어도 빌드/테스트가 완전히 가능함.

🐛 문제 해결 가이드
❗ Tailwind 스타일 미적용

index.css에 Tailwind 지시자 3개 반드시 필요

Vite 기준 content 설정 반드시 필요:

content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]

❗ .env가 적용 안 될 때

반드시 frontend/.env 에 위치해야 함

서버 재시작 필요 (Ctrl+C → npm run dev)

❗ 포트 충돌 발생 시
npm run dev -- --port=3001

🔭 향후 개발 계획

FastAPI/Node 등 백엔드 연동

사용자 로그인 및 개인화 서비스

딥러닝 기반 이상거래 탐지(Autoencoder, IsolationForest 등)

리포트 PDF 생성 기능

다크 모드 UI

모바일 UI 고도화

📝 라이선스 / 기여

포트폴리오/개인 프로젝트 용도 사용 가능

이슈/PR 환영

필요하면
