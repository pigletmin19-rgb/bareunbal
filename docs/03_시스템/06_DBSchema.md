# 06_DBSchema.md — 데이터 구조

최종 업데이트: 2026-04-18

---

## 현재 방식: 로컬 데이터 (src/data/products.js)

현재는 Firebase 없이 정적 데이터로 운영.
추후 Firebase Firestore 또는 별도 백엔드로 전환 가능.

---

## 상품 (products.js)

```js
{
  id: 'p001',
  name: '스파인케어 워커 Pro',
  nameEn: 'SpineCare Walker Pro',
  category: 'men',           // men | women | kids
  tags: ['bestseller'],      // new | bestseller | sale
  price: 198000,
  originalPrice: 248000,     // null이면 할인 없음
  colors: ['#hex'],
  colorNames: ['색상명'],
  sizes: [240, 245, ...],    // mm 단위
  image: 'URL',
  images: ['URL', ...],
  description: '...',
  features: ['기능1', ...],
  badge: '베스트셀러',
  rating: 4.8,
  reviewCount: 312,
  stock: 50,
  isVisible: true
}
```

---

## 주문 (추후 구현)

```js
{
  orderId: 'ORD-20260418-001',
  userId: 'user123',
  items: [
    { productId: 'p001', size: 265, qty: 1, price: 198000 }
  ],
  couponCode: null,
  discountAmount: 0,
  shippingFee: 3000,
  totalPrice: 201000,
  shippingAddress: {
    name: '홍길동',
    phone: '010-1234-5678',
    zipCode: '04567',
    address: '서울시 중랑구',
    detail: '101호'
  },
  status: 'paid',            // pending | paid | preparing | shipping | delivered | cancelled
  trackingNumber: null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 회원 (추후 구현)

```js
{
  userId: 'user123',
  email: 'user@email.com',
  name: '홍길동',
  phone: '010-1234-5678',
  grade: 'normal',           // normal | silver | gold | vip
  totalPurchase: 0,
  orderCount: 0,
  createdAt: timestamp,
  isActive: true
}
```

---

## 쿠폰 (추후 구현)

```js
{
  code: 'TERRA10',
  type: 'percent',           // percent | fixed
  value: 10,                 // 10% 또는 10000원
  minOrder: 50000,
  maxDiscount: 30000,
  validFrom: timestamp,
  validTo: timestamp,
  usageLimit: 100,
  usedCount: 0,
  isActive: true
}
```

---

## 호스팅 구조 (Firebase 없는 경우)

```
Vercel (정적 호스팅)
  └ React 빌드 파일 (dist/)
      └ 상품 데이터: src/data/products.js (정적)
      └ 주문/회원: 추후 백엔드 연동
```
