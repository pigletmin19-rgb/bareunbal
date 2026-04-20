# 09_SecurityGuide.md — 보안 가이드

최종 업데이트: 2026-04-18

---

## 상업용 운영 시 필수 보안 체크리스트

---

## 1. HTTPS (필수)

- Vercel 배포 시 자동으로 HTTPS 적용됨
- bareunbal.com 도메인 연결 후 SSL 인증서 자동 발급
- HTTP 접속 시 자동으로 HTTPS로 리다이렉트

---

## 2. 결제 보안 (토스페이먼츠)

- 토스페이먼츠가 PCI DSS 인증을 보유함 (카드 정보 직접 수집 불가, 불필요)
- 클라이언트 키(ck_)만 프론트에 노출, 시크릿 키(sk_)는 절대 노출 금지
- 시크릿 키는 백엔드 서버(또는 Vercel Edge Functions)에서만 사용
- 결제 검증은 반드시 서버 측에서 수행

### 키 관리 방법

```
❌ 잘못된 방법: 코드에 직접 입력
const secretKey = "live_sk_XXXXXX"

✅ 올바른 방법: 환경변수 사용
VITE_TOSS_CLIENT_KEY=live_ck_XXXXXX  (프론트, .env.local)
TOSS_SECRET_KEY=live_sk_XXXXXX       (서버, Vercel 환경변수)
```

---

## 3. 환경변수 관리

.env.local 파일 생성 후 아래 변수 입력:

```
VITE_TOSS_CLIENT_KEY=test_ck_XXXXXXXXXX
```

⚠️ .env.local은 반드시 .gitignore에 포함 (기본 설정되어 있음)
⚠️ GitHub에 절대 업로드 금지

---

## 4. 관리자 페이지 보안

현재 /admin 경로는 인증 없이 접근 가능 (개발 단계)

**운영 전 필수 구현:**
- 관리자 로그인 페이지
- 관리자 계정 인증 (Firebase Auth 또는 별도 인증)
- /admin 경로에 인증 미들웨어 적용
- 관리자 활동 로그 기록

---

## 5. 개인정보 보호

- HTTPS를 통한 암호화 전송 (Vercel 제공)
- 비밀번호는 bcrypt 해싱 저장 (백엔드 구현 시)
- 결제 카드 정보는 저장하지 않음 (토스페이먼츠가 처리)
- 개인정보처리방침 페이지 제공 완료

---

## 6. XSS 방지

- React는 기본적으로 XSS 방지 (dangerouslySetInnerHTML 사용 금지)
- 사용자 입력값 표시 시 항상 React JSX를 통해 출력

---

## 7. 사기 주문 방지

- 토스페이먼츠 결제 후 서버에서 결제 금액 검증 필수
- 이상 주문 패턴 모니터링 (단기간 다수 주문 등)

---

## 8. Vercel 보안 설정

Vercel Dashboard → Settings → Security에서:
- Password Protection (개발 단계에서 사용)
- Rate Limiting 설정

---

## 9. 도메인 보안 (후이즈)

- DNSSEC 활성화 (후이즈 DNS 설정)
- 도메인 잠금 기능 활성화 (무단 이전 방지)

---

## 10. 정기 점검 항목

| 항목 | 주기 |
|------|------|
| 의존성 취약점 점검 (npm audit) | 월 1회 |
| 관리자 비밀번호 변경 | 분기 1회 |
| 결제 이상 거래 확인 | 일 1회 |
| 백업 확인 | 주 1회 |
