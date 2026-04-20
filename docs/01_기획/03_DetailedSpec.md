# 03_DetailedSpec.md — 상세 기능 명세

최종 업데이트: 2026-04-18

---

## 상품 데이터 구조

```
Product {
  id: string               // 고유 ID (예: p001)
  name: string             // 상품명 (한글)
  nameEn: string           // 상품명 (영문)
  category: string         // men | women | kids
  tags: string[]           // new | bestseller | sale
  price: number            // 판매가 (원)
  originalPrice: number    // 정가 (할인 시)
  colors: string[]         // 색상 hex 배열
  colorNames: string[]     // 색상명 배열
  sizes: number[]          // 사이즈 배열 (mm)
  image: string            // 대표 이미지 URL
  images: string[]         // 상세 이미지 URL 배열
  description: string      // 상품 설명
  features: string[]       // 주요 기능 목록
  badge: string            // 뱃지 텍스트
  rating: number           // 평점 (0-5)
  reviewCount: number      // 리뷰 수
  stock: number            // 재고
  isVisible: boolean       // 노출 여부
}
```

---

## 주문 상태 흐름

```
결제대기 → 결제완료 → 배송준비중 → 배송중 → 배송완료
                ↓
            취소/환불
```

---

## 회원 등급

| 등급 | 조건 | 혜택 |
|------|------|------|
| 일반 | 기본 | - |
| 실버 | 누적 구매 3회 이상 | 5% 할인 쿠폰 |
| 골드 | 누적 구매 50만원 이상 | 10% 할인 쿠폰 |
| VIP | 누적 구매 100만원 이상 | 15% 할인 + 무료배송 |

---

## 배송 정책

- 기본 배송비: 3,000원
- 무료배송 기준: 50,000원 이상 구매
- 배송 기간: 2-3 영업일 (CJ대한통운)
- 제주/도서산간: 추가 3,000원

---

## 반품/교환 정책

- 반품 가능 기간: 수령 후 7일 이내
- 교환 가능 기간: 수령 후 14일 이내
- 착용 후 반품 불가 (위생용품 특성)
- 제품 불량/오배송: 전액 환불 + 왕복 배송비 지원

---

## 쿠폰 정책

- 쿠폰 종류: 정액 할인 / 정률 할인
- 쿠폰 중복 사용: 불가 (한 주문에 1개만)
- 최소 주문 금액 설정 가능
- 유효기간 설정 가능
