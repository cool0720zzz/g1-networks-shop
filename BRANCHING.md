# 브랜치 / 버전 관리 가이드

## 버전 체계

이 프로젝트는 **V1 안정 버전**과 **V2 개선 작업**을 분리해서 관리합니다.

| 버전 | Git 위치 | 배포 URL | 상태 |
|------|----------|----------|------|
| **V1 (안정)** | `main` 브랜치 + `v1-stable` 태그 | https://g1-networks-shop.vercel.app | 안정 — 업체 시연용 |
| **V2 (개선)** | `v2-redesign` 브랜치 | https://g1-networks-shop-git-v2-redesign-cool0720zzzs-projects.vercel.app *(자동)* | 작업 중 — Lazyweb 분석 기반 |

> Vercel은 모든 브랜치에 대해 자동으로 프리뷰 URL을 발급합니다. v2-redesign 브랜치에 push할 때마다 위 URL이 자동 갱신됩니다.

---

## V2에서 V1으로 돌아가는 방법

### 방법 1: 브랜치 전환 (권장)
```bash
git checkout main
npm run dev
# → V1 안정 버전 로컬 실행
```

### 방법 2: 태그로 정확한 시점 복구
```bash
git checkout v1-stable
npm run dev
# → V1 태그 시점의 정확한 코드로 실행
```

### 방법 3: Vercel 라이브 URL
- V1: https://g1-networks-shop.vercel.app (영구)
- V2: 프리뷰 URL (Vercel 대시보드 또는 GitHub PR에서 확인)

---

## V2 개선 작업 흐름

```bash
# 현재 어디 있는지 확인
git branch
# *v2-redesign  ← 여기서 작업

# 변경사항 push → Vercel 자동 프리뷰 갱신
git add -A
git commit -m "feat: ..."
git push origin v2-redesign
```

---

## V2가 만족스러우면 V1로 승격

```bash
# 옵션 A: PR 머지 (GitHub에서)
# v2-redesign → main 으로 PR 만들고 리뷰 후 머지

# 옵션 B: CLI로 직접 머지
git checkout main
git merge v2-redesign
git push origin main
# → main 자동 배포 → V1이 V2로 업데이트됨

# 머지 직후 새 안정 태그 박기
git tag -a v2-stable -m "V2 stable"
git push origin v2-stable
```

---

## V2 작업 폐기하고 처음부터 다시

```bash
git checkout main
git branch -D v2-redesign
git push origin --delete v2-redesign
git checkout -b v2-redesign main
git push -u origin v2-redesign
```

---

## V2 개선 항목 (Lazyweb 분석 기반)

리포트 위치: `.lazyweb/design-improve/landing-shop-split-2026-04-12/`

| # | 아이디어 | 우선순위 | 상태 |
|---|---------|---------|------|
| 1 | 랜딩에 B2B 신뢰 신호 (파트너 로고 / 거래량 / testimonials) | ⭐ | TODO |
| 2 | `/products` 최상단 차종 빠른 검색 위젯 | High | TODO |
| 3 | 인증 후 샵 메인 "내 계정 미니 패널" | High | TODO |
| 4 | 로그인 페이지 좌우 분할 (도매/소매 진입 분기) | Mid | TODO |
| 5 | 등급 인디케이터 강화 (가격 위 라벨 등) | Mid | TODO |

---

*최종 업데이트: 2026-04-12*
