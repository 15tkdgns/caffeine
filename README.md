# ☕ 카페인 (Caffeine)

**Card Payment Insight — 당신의 소비를 한눈에**  

AI 기반 **신용카드 거래 분석 및 이상거래 탐지** 웹 애플리케이션  
(React, Tailwind CSS, Recharts 기반 모던 대시보드)

---

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B?style=flat-square)
![Lucide React](https://img.shields.io/badge/Lucide_Icons-React-0FA9E6?style=flat-square)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=flat-square&logo=githubactions&logoColor=white)

</div>

---

## 📋 프로젝트 소개

**카페인(Caffeine)** 은 신용카드 거래 데이터를 기반으로, 사용자의 소비 패턴을 시각화하고 이상거래를 탐지하는 대시보드형 웹 애플리케이션입니다.

다음과 같은 기능을 제공합니다:

- 🚨 **이상거래 자동 탐지**  
  - 평소 소비 범위를 벗어난 거래를 **빨간색 경고 태그**로 표시
  - 거래 리스트에서 직관적으로 확인 가능

- 📊 **소비 패턴 분석**  
  - 카테고리별 지출 합계 및 비율
  - 월별 수입/지출 추세 변화

- 📅 **캘린더 뷰 제공**  
  - 6x7(42칸) 레이아웃의 월별 캘린더
  - 날짜별 수입/지출 합계 표시

- 📈 **통계/차트 시각화**  
  - 최근 6개월 월별 수입/지출 추세 (Bar Chart)
  - 카테고리별 지출 비율 (Pie Chart + 상세 리스트)

- 🔄 **MOCK 데이터 / 실제 백엔드 API 자동 전환**  
  - `.env` 설정에 따라 더미데이터 또는 실제 API 응답 사용

- ⚙️ **GitHub Actions 기반 CI 지원**  
  - 설치 → 테스트 → 빌드 자동화
  - CI 환경에서 `.env` 자동 생성

---

## 🎨 주요 화면/기능

### 1️⃣ 대시보드 (Dashboard)

- 상단 통계 카드 4개
  - 이번 달 **수입**
  - 이번 달 **지출**
  - **순 잔액**
  - **이상거래 건수**
- 카테고리 필터 버튼 (`전체`, `식비`, `카페`, `교통` 등)
- 최근 거래 리스트
  - 수입/지출/이상거래에 따라 색/아이콘/배경이 달라짐
  - 가맹점, 날짜, 카테고리, 금액, 이상거래 여부 표시

### 2️⃣ 캘린더 (Calendar)

- 6주 × 7일 = 42칸 레이아웃
- 해당 날짜의 **수입/지출 합계** 표시
- 현재 월 / 이전 월 / 다음 월 날짜 시각적으로 구분
- 상단에서 **이전/다음/오늘** 버튼으로 월 이동

### 3️⃣ 통계 분석 (Charts)

- **월별 수입/지출 추세 (BarChart)**  
  - 최근 n개월 기준 수입/지출 막대 그래프
  - Tooltip으로 만원 단위 표시

- **카테고리별 지출 분석 (PieChart + 리스트)**  
  - PieChart로 카테고리별 지출 비율 시각화
  - 오른쪽에서 각 카테고리별
    - 지출 금액
    - 전체 대비 비율 (%)
    - 얇은 바(Progress bar)로 표현

---

## ⚙️ 최근 리팩토링/구조 개편 내용

기존에는 **`App.js` 하나에 모든 UI/로직이 몰려 있는 상태**였으나, 유지보수성과 확장성을 위해 아래와 같이 리팩토링을 진행했습니다.

### ✅ 1. View / Component / Hook / Utils 구조 분리

```bash
src/
 ├── components/   # 재사용 가능한 UI 단위
 │    ├── TopNav.js
 │    ├── StatsSection.js
 │    └── StatCard.js
 ├── views/        # 화면 단위 컴포넌트
 │    ├── DashboardView.js
 │    ├── CalendarView.js
 │    └── ChartsView.js
 ├── hooks/        # 비즈니스 로직/계산용 custom hooks
 │    ├── useStats.js
 │    ├── useCalendar.js
 │    ├── useMonthlyTrend.js
 │    └── useCategoryPieData.js
 ├── utils/        # 더미데이터 등 유틸 함수
 │    └── generateSampleTransactions.js
 ├── App.js        # 상태 관리 + view 조합 (100줄 이하로 리팩토링)
 ├── index.js
 └── index.css
```

- **`components/`**  
  - 재사용 가능한 작은 UI 단위들 (카드, 네비게이션, 리스트 아이템 등)

- **`views/`**  
  - `DashboardView`, `CalendarView`, `ChartsView`처럼 **화면 단위**로 구성

- **`hooks/`**  
  - 통계/집계/캘린더/차트용 데이터 계산을 **custom hook**으로 분리
  - App.js는 계산 로직 없이, **상태 + 뷰 조립**만 담당

- **`utils/`**  
  - 현재는 더미데이터 생성용 `generateSampleTransactions.js` 포함
  - 백엔드 연동 이후에는 개발용 MOCK 모드에서만 사용 가능

---

### ✅ 2. App.js 최소화 (100줄 이하로 리팩토링)

- 전역/페이지 상태 관리
  - `transactions`, `selectedCategory`, `currentMonth`, `view`
- 데이터 소스 선택
  - `.env`의 `REACT_APP_USE_MOCK`에 따라
    - 더미데이터 (`generateSampleTransactions`)
    - 실제 API (`/api/transactions`)
- 나머지 계산은 모두 custom hooks로 이동

예시 (핵심만):

```js
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

const [transactions, setTransactions] = useState(
  USE_MOCK ? generateSampleTransactions() : []
);

useEffect(() => {
  if (USE_MOCK) return;
  // 실제 백엔드 호출 (예: /api/transactions)
}, []);

const stats = useStats(transactions);
const calendarData = useCalendar(currentMonth, transactions);
const monthlyTrend = useMonthlyTrend(transactions);
const categoryPieData = useCategoryPieData(stats.categorySpending);
```

→ App.js는 상태/뷰 연결만 담당하고,  
각각의 계산은 `hooks/`로 분리되어 읽기 쉬운 구조.

---

### ✅ 3. MOCK / 실제 백엔드 자동 전환 (.env 기반)

`.env` 파일에 다음과 같이 설정:

```env
REACT_APP_USE_MOCK=true
```

- `true` → **더미데이터 모드**
  - `generateSampleTransactions()` 호출
  - 백엔드 API 호출 X

- `false` → **실제 백엔드 모드**
  - `useEffect`에서 `/api/transactions` 등의 엔드포인트 호출
  - 응답 JSON을 `setTransactions(data)`로 상태에 반영

백엔드 연동 시에는 `/api/transactions`에서
아래와 같은 형태의 데이터를 내려준다고 가정:

```json
[
  {
    "id": 1,
    "date": "2024-10-25",
    "time": "14:32",
    "merchant": "스타벅스",
    "category": "카페",
    "amount": 4800,
    "isAnomaly": false,
    "isIncome": false
  }
]
```

---

### ✅ 4. GitHub Actions CI에서 .env 자동 생성

CI 환경에서는 `.env`가 없기 때문에, 바로 백엔드 API를 호출하려고 하면 빌드가 실패할 수 있습니다.  
이를 방지하기 위해 **CI에서 자동으로 MOCK 모드용 `.env`를 생성**하도록 구성했습니다.

`.github/workflows/frontend-ci.yml` 예시:

```yaml
- name: Create .env file (MOCK mode for CI)
  working-directory: ./frontend
  run: |
    echo "REACT_APP_USE_MOCK=true" > .env
```

이렇게 하면:

- CI에서는 항상 **더미데이터 기준**으로만 빌드/테스트/린트를 수행
- 실제 운영 환경에서는 `.env` 또는 `.env.production`으로 분리 관리 가능

---

### ✅ 5. Tailwind CSS 완전 적용

- 기존의 CSS를 대부분 Tailwind 유틸리티 클래스로 전환
- 카드/버튼/레이아웃 등은 모두 클래스 기반 스타일링
- 주요 컨셉:
  - 라운딩: `rounded-2xl`, `rounded-3xl`
  - 그림자: `shadow-sm`, `shadow-md`
  - 배경: `bg-gray-50`, `bg-white`, `bg-gradient-to-br ...`
  - 레이아웃: `grid`, `flex`, `gap-4`, `max-w-7xl mx-auto`, `overflow-x-auto` 등

`src/index.css`에는 최소한의 Tailwind 초기 설정만 포함:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📦 사용 기술 스택

### Frontend
- **React 18.x**
- **Tailwind CSS 3.x**
- **Recharts 2.x**
- **Lucide React** (아이콘)

### 기타
- **npm** 기반 빌드
- **GitHub Actions** 를 통한 CI

---

## 🏗 상세 폴더 구조 (예시)

```bash
frontend/
├── public/
├── src/
│   ├── components/
│   │    ├── TopNav.js           # 상단 네비게이션 (로고 + 탭 버튼)
│   │    ├── StatsSection.js     # 상단 통계 카드 영역
│   │    └── StatCard.js         # 재사용 가능한 통계 카드 컴포넌트
│   ├── views/
│   │    ├── DashboardView.js    # 홈(대시보드) 화면
│   │    ├── CalendarView.js     # 캘린더 화면
│   │    └── ChartsView.js       # 통계/차트 화면
│   ├── hooks/
│   │    ├── useStats.js         # 총 수입/지출/이상거래/카테고리별 집계
│   │    ├── useCalendar.js      # 42칸 달력 데이터 생성
│   │    ├── useMonthlyTrend.js  # 월별 수입/지출 데이터
│   │    └── useCategoryPieData.js # 카테고리별 지출 파이차트 데이터
│   ├── utils/
│   │    └── generateSampleTransactions.js  # 더미 거래 데이터 생성
│   ├── App.js                   # 최상위 컴포넌트 (상태 + 뷰 조립)
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 로컬 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/your-repo/caffeine.git
cd caffeine/frontend
```

### 2. 환경 변수 설정 (.env)

루트(`frontend/`)에 `.env` 파일 생성 후 아래 추가:

```env
REACT_APP_USE_MOCK=true
```

- 개발 단계에서는 **true (더미데이터 모드)** 를 추천
- 실제 백엔드 연결 시 false로 변경

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm start
```

브라우저에서 자동으로 `http://localhost:3000`이 열립니다.  
자동으로 열리지 않는 경우 직접 접속하면 됩니다.

---

## 🧪 CI (GitHub Actions) 연동

`.github/workflows/frontend-ci.yml` 에서 다음 작업을 수행:

1. 저장소 checkout
2. Node.js 18 설정 + npm 캐시
3. `frontend/` 디렉토리에서 `npm ci`
4. `.env` 자동 생성 (`REACT_APP_USE_MOCK=true`)
5. `npm run lint` (존재할 때만)
6. `npm test -- --watch=false --passWithNoTests` (존재할 때만)
7. `npm run build` (존재할 때만)

CI 환경에서도 **더미데이터 기준으로만 빌드/테스트** 되므로  
백엔드 서버 의존성 없이 안정적으로 동작합니다.

---

## 🐛 문제 해결 가이드

### 1. Tailwind 스타일이 적용되지 않을 때

- `src/index.css`에 다음이 포함되어 있는지 확인:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `tailwind.config.js`의 `content` 경로가 올바른지 확인:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: []
};
```

- 변경 후 개발 서버 재시작:

```bash
npm start
```

---

### 2. .env가 적용되지 않을 때

- `.env` 파일이 **프로젝트 루트(frontend)** 에 있는지 확인
- 파일명은 반드시 `.env` (확장자 없음)
- 개발 서버를 완전히 종료 후 다시 실행해야 반영됨

```bash
# Ctrl + C 로 종료 후 다시
npm start
```

---

### 3. 포트 충돌 오류

이미 3000번 포트를 다른 앱이 사용 중일 때는:

```bash
PORT=3001 npm start
```

또는 `.env`에 `PORT=3001` 추가 후 실행.

---

## 🔭 향후 개발 계획 (아이디어)

- 백엔드(FastAPI/Node/Express 등)와 실제 연동
- 사용자별 로그인/회원 시스템
- 다중 카드·다중 계좌 지원
- 딥러닝 기반 이상거래 탐지 모델 연동 (Autoencoder, Isolation Forest 등)
- 리포트 PDF 출력 / 엑셀 내보내기 기능
- 다크 모드 UI 지원

---

## 📝 라이선스 / 기여

- 개인/팀 프로젝트 포트폴리오 용도로 활용 가능  
- PR/이슈를 통해 기능 개선 및 버그 제보 환영

---

이 README는 **현재까지 진행된 리팩토링 및 구조 변경 사항을 모두 반영한 버전**입니다.  
프로젝트 구조가 다시 변경되면, 이 문서도 함께 업데이트하는 것을 권장합니다.
