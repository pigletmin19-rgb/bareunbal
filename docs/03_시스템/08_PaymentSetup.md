# 08_PaymentSetup.md — 결제 연동 가이드 (토스페이먼츠)

최종 업데이트: 2026-04-18

---

## 토스페이먼츠 가입

1. https://developers.tosspayments.com 접속
2. 회원가입 (사업자등록증 필요)
3. 개발자 센터 → 내 개발 정보 → 키 확인

---

## 필요한 키 값 (설정정보.txt에 입력)

- 클라이언트 키 (테스트): `test_ck_XXXXXXXXXX`
- 시크릿 키 (테스트): `test_sk_XXXXXXXXXX`
- 클라이언트 키 (운영): `live_ck_XXXXXXXXXX`
- 시크릿 키 (운영): `live_sk_XXXXXXXXXX`

---

## 연동 방식

- 토스페이먼츠 JavaScript SDK v2 사용
- 결제창: 카드, 간편결제 (카카오페이, 네이버페이, 토스페이)

---

## 개발 단계 (추후 구현)

1. `npm install @tosspayments/tosspayments-sdk`
2. src/config/payment.js 에 키 설정
3. CheckoutPage.jsx 에서 결제 호출
4. /order/complete 에서 결제 확인

---

## 결제 흐름

```
장바구니 → 주문서 작성 → 결제하기 버튼
  → 토스페이먼츠 결제창 (팝업/리다이렉트)
    → 성공: /order/complete?orderId=xxx
    → 실패: /checkout (에러 메시지)
```

---

## 주의사항

- 테스트 모드에서는 실제 결제 없음
- 운영 전환 시 사업자 심사 완료 필요
- 자동결제(정기결제)는 별도 계약 필요
