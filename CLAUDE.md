# 바른발 (Bareunbal.com) 쇼핑몰

> **제0원칙 — factory 사고체계 참고 (2026-07-14 신설)**: 기능/설계 판단 시 `C:\Users\kjs53\Desktop\factory\PLAYBOOK.md`(설계 판별 필터·자동화 등급·질문 제시 형식 등)를 참고한다.

## 프로젝트 개요

척추·바른자세를 위한 의료기반 기능성 신발 쇼핑몰.
allbirds.co.kr 디자인 레퍼런스, React + Vite 기반.

## 기술 스택

- 프론트엔드: React 18 + Vite
- 스타일: CSS Modules
- 라우팅: React Router v6
- 호스팅: Vercel
- 결제: 토스페이먼츠 v2 (추후 연동)

## 실행

```bash
npm install
npm run dev   # http://localhost:5174
npm run build # 빌드
```

## 주요 경로

- `/` — 홈페이지
- `/products` — 상품 목록
- `/products/:id` — 상품 상세
- `/cart` — 장바구니
- `/checkout` — 결제
- `/admin` — 관리자 (상품/주문/회원/쿠폰)

## 상품 데이터

`src/data/products.js` 에 정적 데이터 저장. 관리자에서 수정 후 Firebase/API 연동 예정.

## 환경변수

`.env.local` 파일에 입력 (`.gitignore`에 포함, GitHub 업로드 금지):

```
VITE_TOSS_CLIENT_KEY=test_ck_XXXXXXXXXX
```

## 문서

`docs/` 폴더 참고:
- `01_기획/` — 기획서, 기능 명세
- `02_디자인/` — 디자인 가이드, 메뉴 구조
- `03_시스템/` — DB 구조, 배포, 결제 설정
- `04_운영/` — 보안 가이드
