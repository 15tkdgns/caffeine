# ☕ 카페인 (Caffeine)

**Card Payment Insight --- 당신의 소비를 한눈에**

AI 기반 **신용카드 거래 분석·시각화·이상거래 탐지** 웹 애플리케이션\
(React + Vite + Tailwind CSS + Recharts 기반 모던 대시보드)

------------------------------------------------------------------------

::: {align="center"}
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)
![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B?style=flat-square)
![Lucide
React](https://img.shields.io/badge/Lucide_Icons-React-0FA9E6?style=flat-square)
![GitHub
Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=flat-square&logo=githubactions)
:::

------------------------------------------------------------------------

# 📋 프로젝트 소개

**카페인(Caffeine)** 은 신용카드 거래 데이터를 기반으로 사용자의 소비
흐름을 분석하고,\
이상거래를 자동으로 탐지·시각화하는 대시보드형 웹 앱입니다.

주요 기능:

-   🚨 **이상거래 자동 탐지**
-   📊 **카테고리별 소비 분석**
-   📅 **월별 캘린더 지출 뷰**
-   📈 **월별 수입/지출 추세 차트**
-   🔄 **MOCK 데이터 / 실제 API 자동 전환**
-   ⚙️ **CI 환경에서 테스트·빌드 자동화**

백엔드 연동 전 단계에서도 **더미 데이터 기반으로 완전한 UI/UX 테스트**가
가능합니다.

------------------------------------------------------------------------

# 🎨 주요 기능 소개

## 1️⃣ 대시보드(Dashboard)

-   이번 달 **수입 / 지출 / 순지출 / 이상거래 건수** 통계 카드
-   카테고리 필터 UI
-   최근 거래 리스트\
    → 수입·지출·이상거래에 따라 색상/스타일 자동 구분

## 2️⃣ 캘린더(Calendar)

-   6 × 7 = 42칸 월간 캘린더
-   각 날짜의 총 지출/수입 표시
-   이전/다음/오늘 이동 기능 지원

## 3️⃣ 통계(Charts)

-   **월별 추세 (BarChart)**\
-   **카테고리별 파이차트 + 퍼센트 바 + 상세 합계**

## 4️⃣ 이상거래 탐지

-   MOCK 데이터 또는 백엔드 API에서 제공한\
    `isAnomaly: true` 거래를 자동 표시
    -   빨간 배지로 강조\
    -   리스트에서 상단 우선 정렬 가능 (옵션)

------------------------------------------------------------------------

# ⚙️ 최신 리팩토링 / 구조 개편

기존에는 `App.js` 하나에 UI + 로직이 모두 포함되어 있었지만,\
리팩토링 후 크게 **4개의 폴더 구조로 분리**되었습니다.

    src/
     ├── components/   # UI 컴포넌트 (작은 단위)
     ├── views/        # 화면 단위 컴포넌트
     ├── hooks/        # 통계/계산 로직 custom hooks
     ├── utils/        # 더미 데이터 등 유틸
     ├── App.js        # 라우팅/상태 조립만 담당
     └── index.jsx

## 📌 핵심 변경점

### ✔ 1. 모든 계산 로직 → custom hook 분리

`useStats`, `useCalendar`, `useMonthlyTrend`, `useCategoryPieData`\
→ App.js는 **상태 관리 + 뷰 연결만 담당** (100줄 이하 유지)

### ✔ 2. Tailwind CSS 3.x 완전 적용 (Vite 기반)

-   최신 Tailwind 4 문제를 해결하기 위해\
    Tailwind 3.x로 고정 설치해 안정적 동작 보장
-   `index.css`는 Tailwind 지시자만 유지:

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ✔ 3. `.env` 기반 MOCK / 실제 API 자동 전환

``` env
REACT_APP_USE_MOCK=true
```

→ true: 더미데이터 사용\
→ false: 백엔드 API 사용

### ✔ 4. GitHub Actions CI에서 `.env` 자동 생성

CI 환경에서 아래처럼 `.env` 자동 생성:

``` yaml
- name: Create .env for CI
  working-directory: ./frontend
  run: echo "REACT_APP_USE_MOCK=true" > .env
```

------------------------------------------------------------------------

# 🏗 상세 폴더 구조

``` bash
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
```

------------------------------------------------------------------------

# 🚀 로컬 실행 방법

Vite 기반이므로 실행 명령어는 **`npm start`가 아니라 `npm run dev`**
입니다.

## 1. 저장소 클론

``` bash
git clone https://github.com/your-repo/caffeine.git
cd caffeine/frontend
```

## 2. 환경 변수 설정

`frontend/.env` 생성:

``` env
REACT_APP_USE_MOCK=true
```

## 3. 패키지 설치

``` bash
npm install
```

## 4. 개발 서버 실행

``` bash
npm run dev
```

접속 주소:

    http://localhost:3000

------------------------------------------------------------------------

# 🧪 CI (GitHub Actions)

CI는 다음 단계로 진행됩니다:

1.  저장소 checkout\
2.  Node 18 세팅 + npm 캐시\
3.  `frontend/`에서 `npm ci`\
4.  `.env` 자동 생성\
5.  테스트/빌드 진행

------------------------------------------------------------------------

# 🐛 문제 해결 가이드

## Tailwind 적용 안 될 때

-   `index.css` 확인
-   `tailwind.config.js` content 경로 확인

## `.env`가 안 먹힐 때

-   반드시 `frontend/.env`\
-   서버 재시작 필요

## 포트 충돌 시

``` bash
npm run dev -- --port=3001
```

------------------------------------------------------------------------

# 🔭 향후 개발 계획

-   FastAPI/Node 등 백엔드 연동\
-   로그인/사용자 시스템\
-   이상거래 탐지 모델(Autoencoder/IsolationForest 등) 연동\
-   PDF/Excel 리포트 출력\
-   다크 모드\
-   모바일 UI 고도화

------------------------------------------------------------------------

# 📝 라이선스 / 기여

-   개인/팀 프로젝트 용도 사용 가능\
-   PR/이슈 환영
