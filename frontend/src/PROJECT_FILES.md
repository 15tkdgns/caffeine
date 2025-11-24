# 프로젝트 파일 목록 및 복사 가이드

이 문서는 SmartSpend 프로젝트의 모든 파일을 VS Code로 복사하는 방법을 안내합니다.

## 📋 복사 방법

Figma Make에서는 직접 ZIP 다운로드를 지원하지 않으므로, 각 파일을 개별적으로 복사해야 합니다.

### 방법 1: 브라우저 개발자 도구 사용
1. 브라우저에서 F12를 눌러 개발자 도구 열기
2. Sources 탭에서 파일 탐색
3. 각 파일 내용을 복사하여 로컬에 저장

### 방법 2: 파일별 수동 복사
아래 파일 목록을 참고하여 각 파일을 생성하고 내용을 복사합니다.

---

## 📁 필수 파일 목록

### 1. 루트 파일
- `/App.tsx` - 메인 애플리케이션 파일
- `/README.md` - 프로젝트 문서

### 2. 스타일 파일
- `/styles/globals.css` - 전역 CSS 및 Tailwind 설정

### 3. 메인 컴포넌트 (6개)
- `/components/Header.tsx`
- `/components/ExpenseList.tsx`
- `/components/SpendingPattern.tsx`
- `/components/CouponRecommendations.tsx`

### 4. 인증 컴포넌트 (2개)
- `/components/auth/LoginPage.tsx`
- `/components/auth/SignupPage.tsx`

### 5. 사용자 컴포넌트 (1개)
- `/components/user/UserProfile.tsx`

### 6. 관리자 컴포넌트 (4개)
- `/components/admin/AdminDashboard.tsx`
- `/components/admin/AgeAnalysis.tsx`
- `/components/admin/SpendingAnalytics.tsx`
- `/components/admin/AnalyticsSummary.tsx`

### 7. UI 컴포넌트 라이브러리 (자동 생성됨)
`/components/ui/` 폴더의 모든 파일들은 shadcn/ui 기반으로 자동 생성되어 있습니다.

---

## 🔧 로컬 환경 설정 (참고)

로컬에서 실행하려면 다음과 같은 설정이 필요합니다:

### package.json 예시
```json
{
  "name": "smartspend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### vite.config.ts 예시
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

---

## 📊 파일 크기 및 라인 수

| 파일 | 라인 수 | 설명 |
|------|---------|------|
| App.tsx | 91 | 메인 앱 로직 |
| ExpenseList.tsx | 154 | 지출 내역 |
| SpendingPattern.tsx | 136 | 소비 패턴 |
| CouponRecommendations.tsx | 213 | 쿠폰 추천 |
| Header.tsx | 95 | 네비게이션 |
| LoginPage.tsx | 118 | 로그인 |
| SignupPage.tsx | 176 | 회원가입 |
| UserProfile.tsx | 196 | 프로필 |
| AdminDashboard.tsx | 64 | 관리자 메인 |
| AgeAnalysis.tsx | 150 | 연령 분석 |
| SpendingAnalytics.tsx | 185 | 소비 분석 |
| AnalyticsSummary.tsx | 208 | 분석 요약 |

**총 라인 수: 약 1,786 라인**

---

## 🎨 주요 의존성

```
react
react-dom
recharts (차트)
lucide-react (아이콘)
tailwindcss (스타일링)
```

---

## ✅ 복사 체크리스트

- [ ] App.tsx
- [ ] styles/globals.css
- [ ] components/Header.tsx
- [ ] components/ExpenseList.tsx
- [ ] components/SpendingPattern.tsx
- [ ] components/CouponRecommendations.tsx
- [ ] components/auth/LoginPage.tsx
- [ ] components/auth/SignupPage.tsx
- [ ] components/user/UserProfile.tsx
- [ ] components/admin/AdminDashboard.tsx
- [ ] components/admin/AgeAnalysis.tsx
- [ ] components/admin/SpendingAnalytics.tsx
- [ ] components/admin/AnalyticsSummary.tsx
- [ ] components/ui/* (전체)

---

## 💡 추가 도움말

1. **VS Code에서 폴더 구조 만들기**
   ```bash
   mkdir -p components/auth
   mkdir -p components/user
   mkdir -p components/admin
   mkdir -p components/ui
   mkdir -p styles
   ```

2. **Git으로 관리하기**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SmartSpend 금융 앱"
   ```

3. **환경 변수 설정**
   - `.env` 파일 생성
   - API 키 및 환경 변수 설정

---

이 가이드가 도움이 되셨기를 바랍니다! 🚀
