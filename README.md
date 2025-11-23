# ☕ 카페인 (Caffeine)

**Card Payment Insight** - 당신의 소비를 한 눈에

AI 기반 신용카드 거래 분석 및 이상거래 탐지 웹 애플리케이션

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B?style=flat-square)

---

## 📋 프로젝트 소개

카페인은 신용카드 거래 내역을 분석하여 다음 기능을 제공합니다:

- 🚨 **이상거래 자동 탐지**: 평소 소비 패턴과 다른 거래를 빨간색으로 표시
- 📊 **소비 패턴 분석**: 카테고리별 지출 통계 및 시각화
- 📅 **캘린더 뷰**: 일별 수입/지출을 한눈에 확인
- 📈 **통계 차트**: 월별 추세 분석 및 카테고리별 비율 확인
- 🎯 **맞춤 광고**: 소비 패턴 기반 개인화 광고 추천

---

## 🎨 주요 기능

### 1️⃣ 대시보드
- 총 수입/지출/순잔액 요약
- 이상거래 건수 표시
- 카테고리별 거래 내역 필터링
- 실시간 거래 목록

### 2️⃣ 캘린더
- 월별 캘린더 뷰
- 일별 수입(초록색)/지출(빨간색) 표시
- 월 단위 네비게이션

### 3️⃣ 통계 분석
- **막대 그래프**: 최근 6개월 월별 수입/지출 추세
- **원형 그래프**: 카테고리별 지출 비율 (식비%, 교통비% 등)
- 카테고리별 상세 금액 및 퍼센트

---

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 14.x 이상
- **npm** 6.x 이상

### 설치 방법

1️⃣ **저장소 클론**
```bash
git clone https://github.com/your-username/caffeine-card-app.git
cd caffeine-card-app
```

2️⃣ **의존성 패키지 설치**
```bash
npm install
```

3️⃣ **개발 서버 실행**
```bash
npm start
```

브라우저가 자동으로 열리며 `http://localhost:3000`에서 앱을 확인할 수 있습니다! 🎉

---

## 📦 사용된 기술 스택

### Frontend
- **React 18.x**: UI 프레임워크
- **Tailwind CSS 3.x**: 유틸리티 기반 CSS 프레임워크
- **Recharts**: 데이터 시각화 라이브러리
- **Lucide React**: 아이콘 라이브러리

### 주요 의존성
```json
{
  "react": "^18.x",
  "lucide-react": "^0.263.1",
  "recharts": "^2.x",
  "tailwindcss": "^3.4.1"
}
```

---

## 📂 프로젝트 구조

```
caffeine-card-app/
├── public/              # 정적 파일
├── src/
│   ├── App.js          # 메인 애플리케이션 컴포넌트
│   ├── index.js        # 엔트리 포인트
│   └── index.css       # Tailwind CSS 설정
├── tailwind.config.js  # Tailwind 설정 파일
├── postcss.config.js   # PostCSS 설정 파일
├── package.json        # 프로젝트 메타데이터
└── README.md           # 프로젝트 문서
```

---

## 🛠️ 개발 가이드

### 코드 구조

프로젝트는 다음과 같은 주요 컴포넌트로 구성되어 있습니다:

- **StatCard**: 통계 카드 컴포넌트
- **TransactionItem**: 거래 항목 컴포넌트
- **CalendarDay**: 캘린더 날짜 컴포넌트
- **CategoryBreakdown**: 카테고리 분석 컴포넌트

### 스타일링

Tailwind CSS의 유틸리티 클래스를 사용하여 스타일링됩니다:
- 커피 테마: `amber`, `orange`, `yellow` 계열 색상
- 그라데이션: `bg-gradient-to-r from-amber-500 to-orange-500`

### 데이터 생성

현재는 `generateSampleTransactions()` 함수로 예시 데이터를 생성합니다.
실제 API 연동 시 이 함수를 API 호출로 대체하면 됩니다.

---

## 🐛 문제 해결

### Tailwind CSS가 적용되지 않는 경우

1. `tailwind.config.js` 파일 확인
2. `src/index.css`에 다음이 포함되어 있는지 확인:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
3. 서버 재시작: `npm start`

### 포트 충돌 오류

```bash
PORT=3001 npm start
```

### 패키지 오류

```bash
rm -rf node_modules package-lock.json
npm install
```

---