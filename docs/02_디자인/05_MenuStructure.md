# 05_MenuStructure.md — 화면 이동 구조

최종 업데이트: 2026-04-18

---

## 라우트 구조

```
/                           홈페이지 (메인 랜딩)
/products                   전체 상품 목록
/products/men               남성 상품
/products/women             여성 상품
/products/kids              키즈 상품
/products/sale              세일 상품
/products/:id               상품 상세 페이지
/cart                       장바구니
/checkout                   주문/결제
/order/complete             주문 완료
/login                      로그인 / 회원가입
/mypage                     마이페이지
/orders                     주문 내역
/about                      브랜드 소개 (소재 & 기술)
/notice                     공지사항
/faq                        자주묻는질문
/privacy                    개인정보처리방침
/terms                      이용약관
/admin                      관리자 대시보드
/admin/products             상품 관리
/admin/orders               주문 관리
/admin/members              회원 관리
/admin/coupons              쿠폰 관리
/*                          404 NotFoundPage
```

---

## 화면 흐름

### 비회원 구매 흐름
```
/ (홈)
  → /products (상품 목록)
      → /products/:id (상품 상세)
          → /cart (장바구니)
              → /login (로그인 유도)
                  → /checkout (주문/결제)
                      → /order/complete (완료)
```

### 회원 구매 흐름
```
/ (홈)
  → /products/:id (상품 상세)
      → /cart
          → /checkout → /order/complete
  → /orders (주문 내역 확인)
  → /mypage (개인정보)
```

### 관리자 흐름
```
/admin (대시보드 - 매출 현황)
  → /admin/products (상품 등록/수정/삭제)
  → /admin/orders (주문 현황 + 배송 처리)
  → /admin/members (회원 목록 + 등급 관리)
  → /admin/coupons (쿠폰 생성/발급)
```

---

## 헤더 네비게이션

```
TERRA [로고]    신제품 | 남성 | 여성 | 키즈 | 소재&기술 | 세일    [계정] [장바구니]
```

---

## 푸터 구조

```
TERRA                   쇼핑          고객지원        회사
  브랜드 소개            신제품          공지사항        회사소개
  소재 & 기술            남성           FAQ            개인정보처리방침
  지속가능성             여성           1:1 문의        이용약관
                        키즈
                        세일

사업자 정보 | 고객센터: [전화번호] | 이메일: [이메일]
© 2026 TERRA. All rights reserved.
```
