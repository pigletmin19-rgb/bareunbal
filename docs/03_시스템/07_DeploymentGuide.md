# 07_DeploymentGuide.md — 배포 가이드

최종 업데이트: 2026-05-19

---

## 배포 방식: GitHub + Vercel

Firebase 없이 Vercel로 정적 호스팅.
도메인은 후이즈(Whois)에서 보유 중.

---

## 1단계: GitHub 저장소 생성

1. https://github.com 접속 → 로그인
2. 우상단 [+] → New repository
3. Repository name: `shoes-homepage`
4. Public 또는 Private 선택
5. [Create repository] 클릭

---

## 2단계: 코드 업로드

```bash
# shoes 폴더에서 실행
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[내아이디]/shoes-homepage.git
git push -u origin main
```

---

## 3단계: Vercel 배포

1. https://vercel.com 접속 → GitHub으로 로그인
2. [Add New Project] 클릭
3. GitHub 저장소 `shoes-homepage` 선택
4. Framework: Vite 자동 감지
5. [Deploy] 클릭
6. 자동 배포 완료 → `xxx.vercel.app` URL 생성

---

## 4단계: 커스텀 도메인 연결

1. Vercel 프로젝트 → Settings → Domains
2. 보유 도메인 입력 (예: terra-shoes.co.kr)
3. Vercel이 제공하는 DNS 레코드를 후이즈에 입력:
   - A 레코드: 76.76.19.61
   - CNAME: cname.vercel-dns.com
4. 후이즈 → DNS 설정에서 위 값 입력
5. 15분~1시간 후 연결 완료

---

## 5단계: 자동 배포 설정

- GitHub에 코드 push → Vercel 자동 재배포
- 별도 설정 불필요 (Vercel이 자동으로 처리)

---

## 현재 배포 현황 (2026-05-19 기준)

| 항목 | 내용 |
|------|------|
| GitHub 저장소 | https://github.com/pigletmin19-rgb/bareunbal (Public) |
| Vercel 계정 | pigletmin19-rgb |
| 프로덕션 URL | bareunbal.com / www.bareunbal.com |
| 네임서버 | ns1.vercel-dns.com / ns2.vercel-dns.com (후이즈) |
| DNS A 레코드 | 216.198.79.1 (Vercel DNS 관리) |

### 배포 방법 (현재)
- 고객 컴퓨터(`C:\Users\mhson\bareunbal`)에서 push해야 자동 배포됨
- Vercel Hobby 플랜 제한: 저장소 소유자 계정 커밋만 배포 허용

```bash
cd C:\Users\mhson\bareunbal
git pull
git commit --allow-empty -m "trigger deploy"
git push
```

### 환경변수 (Vercel에 설정 완료)
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

---

## 로컬 개발 실행

```bash
cd shoes 폴더
npm install
npm run dev
```

브라우저: http://localhost:5174

---

## 빌드

```bash
npm run build
# dist/ 폴더에 빌드 파일 생성
```
