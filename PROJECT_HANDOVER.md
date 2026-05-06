# G1 Networks B2B 수입차 부품 쇼핑몰 - 인수인계 문서

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | G1 Networks - 수입차 부품 공식 판매점 |
| 사업자 | G1네트웍스 / 대표: 양훈 |
| 디자인/관리 저작권 | AIB Corp. |
| 타겟 | B2B (도매: 정비소/카센터) + 소매 (일반 구매자) |
| 배포 URL | https://g1-networks-shop.vercel.app |
| GitHub | https://github.com/cool0720zzz/g1-networks-shop |
| 참고 사이트 | https://m.jsmotors.co.kr (구조 참고만, 코드 미사용) |

---

## 2. 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.2.3 | App Router, SSR/SSG |
| React | 19.x | UI |
| Tailwind CSS | v4 | 스타일링 (`@import "tailwindcss"` 문법) |
| Zustand | latest | 상태관리 (장바구니, 테마) |
| Lucide React | latest | 아이콘 |
| TypeScript | 5.x | 타입 안전성 |

**배포:** Vercel (GitHub push 시 자동 배포)

---

## 3. 프로젝트 구조

```
shop/
├── src/
│   ├── app/                    # 페이지 (Next.js App Router)
│   │   ├── page.tsx            # 랜딩(홈) 페이지
│   │   ├── layout.tsx          # 글로벌 레이아웃 (Noto Sans KR)
│   │   ├── globals.css         # 다크/라이트 테마 CSS 변수
│   │   ├── products/
│   │   │   ├── page.tsx        # 상품 목록 (필터/정렬)
│   │   │   └── [id]/page.tsx   # 상품 상세 (탭/수량/잔액)
│   │   ├── cart/page.tsx       # 장바구니
│   │   ├── charge/page.tsx     # 잔액 충전 (PG 결제)
│   │   ├── login/page.tsx      # 로그인/회원가입
│   │   └── mypage/page.tsx     # 마이페이지
│   ├── components/
│   │   ├── Header.tsx          # 쇼핑몰 헤더 (검색/잔액/장바구니)
│   │   ├── Footer.tsx          # 푸터 (G1네트웍스 + AIB 저작권)
│   │   └── ThemeToggle.tsx     # 다크/라이트 토글 버튼
│   ├── store/
│   │   ├── theme.ts            # 테마 상태 (Zustand)
│   │   └── cart.ts             # 장바구니 상태 (Zustand)
│   └── data/
│       └── products.ts         # 상품 Mock 데이터 (12개)
├── mockup.html                 # 단독 HTML 목업 (브라우저에서 바로 열기 가능)
└── package.json
```

---

## 4. 취급 브랜드 및 상품

| 카테고리 | 브랜드 |
|----------|--------|
| 브레이크 패드 | Brembo, TRW |
| 브레이크 디스크 | Brembo, TRW |
| 필터 (에어/오일/캐빈) | MANN-FILTER, ZF |
| 엔진오일 | (브랜드 미정) |

---

## 5. 결제 시스템: 선결제 잔액 차감

```
[충전 흐름]
PG 결제 (카드/계좌이체/무통장) → 부가세 제외 금액 잔액 충전
예: 11만원 결제 → 10만원 충전

[구매 흐름]
상품 주문 → 잔액에서 차감 (별도 PG 결제 없음)

[제한]
잔액 10만원 미만 시 구매 차단 → 충전 유도
```

**충전 단위:** 11만원 / 22만원 / 55만원 / 110만원 (부가세 포함)

---

## 6. 회원 등급 시스템 (Mock 구현 완료)

| | 도매 (사업자) | 소매 (일반) |
|---|---|---|
| 가입 | 사업자등록증 첨부 | 일반 가입 |
| 승인 | 관리자 수동 승인 | 관리자 수동 승인 |
| 가격 | 도매가만 표시 | 소매가만 표시 |
| 상대 가격 | 소매가 비노출 | 도매가 비노출 |

**현재 구현 상태:**
- Auth store (`src/store/auth.ts`)에 `UserGrade = "wholesale" | "retail"` 타입 정의
- Product 인터페이스에 `prices: { wholesale, retail }` 분리 저장
- `getPrice(product, grade)` 헬퍼로 등급별 가격 조회
- AuthGuard 컴포넌트로 보호된 라우트 가드
- localStorage persist (zustand persist middleware)

**데모 계정:**
- 도매: ID `wholesale` / PW `1234` (잔액 324,000원)
- 소매: ID `retail` / PW `1234` (잔액 150,000원)

**라우팅 구조:**
- `/` - 랜딩 페이지 (로그인 시 자동 `/products`로 리다이렉트)
- `/login` - 로그인 페이지 (공개)
- `/products`, `/products/[id]`, `/cart`, `/charge`, `/mypage` - AuthGuard로 보호

**⚠ 백엔드 연동 시 주의:** 가격 필터링은 반드시 서버 사이드에서 처리. 현재 프론트 Mock은 데모용으로만 사용. 실제 프로덕션에서는 API에서 사용자 등급에 맞는 가격만 응답하도록 구현 필수.

---

## 7. 디자인 시스템

### 테마
- **다크 모드** (기본): 검정 배경 `#0A0A0A`
- **라이트 모드**: 회색 배경 `#E2E2E7` + 흰색 카드 `#FFFFFF`
- 토글 버튼으로 전환 (CSS 변수 기반)

### 컬러 팔레트
```
Primary (Brand Red): #CC0000
Green (CTA/잔액):    #03C75A
Amber (경고):        #FFD600
```

### 타이포그래피
- Font: Noto Sans KR (Google Fonts, Next.js 자동 최적화)
- Hero: 52px / Black (font-weight: 900)
- Section Title: 32px / Black
- Body: 13-15px / Regular-Semibold

### max-width
- 전체 콘텐츠: **1070px** (`max-w-[1070px]`)

### 호버 효과
- 카드: 빨간 보더 + 그림자 + translateY(-2px)
- Primary 버튼: 밝아짐 + 그림자 + 위로 이동
- Secondary 버튼: 빨간 보더 전환
- 푸터 링크: 은은한 빨강 배경 + 흰색 굵은 글씨

---

## 8. 현재 상태 및 남은 작업

### 완료
- [x] 목업 HTML (mockup.html)
- [x] Next.js 프로젝트 구축 (전체 페이지)
- [x] 다크/라이트 테마 토글
- [x] 장바구니 상태관리 (Zustand)
- [x] Vercel 배포 + GitHub 자동 배포 연동

### 진행 예정
- [ ] **랜딩페이지** (현재 홈 앞에 별도 페이지, 구조/마케팅 요소 기획 중)
- [ ] **도매/소매 회원 시스템** (가입, 승인, 가격 분리)
- [ ] **백엔드 연동** (Supabase 등 - DB, 인증, 가격 서버사이드 필터링)
- [ ] **실제 상품 데이터** 입력 (현재 Mock 12개)
- [ ] **상품 이미지** 적용
- [ ] **PG 결제 연동** (충전 기능)
- [ ] **주문/배송 시스템**
- [ ] **관리자 페이지** (회원 승인, 상품 관리, 주문 관리)

---

## 9. 로컬 개발 환경 세팅

```bash
# 1. 레포 클론
git clone https://github.com/cool0720zzz/g1-networks-shop.git
cd g1-networks-shop

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
# http://localhost:3000
```

### 배포
```bash
# GitHub에 push하면 Vercel 자동 배포
git add -A
git commit -m "변경 내용"
git push origin main
# → https://g1-networks-shop.vercel.app 자동 반영 (1-2분 소요)
```

---

## 10. 주의사항

1. **Tailwind v4** 사용 중 - v3 문법과 다름 (`@import "tailwindcss"`)
2. **Next.js 16** - App Router 사용, `"use client"` 지시문 필수 (클라이언트 컴포넌트)
3. **inline style vs Tailwind** - hover 효과는 반드시 Tailwind 클래스로 적용 (inline style이 우선순위가 높아 hover 무시됨)
4. **가격 데이터** - 현재 프론트 Mock 데이터, 실서비스 시 반드시 서버에서 등급별 필터링
5. **jsmotors 참고** - 구조적 참고만, Cafe24 코드/스킨 저작권 문제 없도록 100% 자체 제작

---

*최종 업데이트: 2026-04-12*
*작성: Claude Opus 4.6 + AIB Corp.*
