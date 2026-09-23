#!/usr/bin/env node
/**
 * 커밋 직전 비밀값 유출 자동검사 (2026-09-23 신설 — 관리자 대시보드 비밀값 공개 노출
 * 사고 재발방지의 마지막 조각).
 *
 * 지금까지 비밀값 검사는 "배포 직전"(deployed_bundle_secret_check.js, launch_gate_check.js
 * 1-a번)에만 있었다 — 그건 이미 커밋되고 빌드까지 끝난 뒤에야 걸린다는 뜻. 이 스크립트는 그보다
 * 훨씬 이른 시점인 **커밋 자체를 막아서** 비밀값이 애초에 git 역사에 남지 않게 한다.
 *
 * 특히 VITE_ 접두사가 붙은 이름에 비밀값처럼 보이는 값이 할당되면 값의 실제 내용과 무관하게
 * 무조건 막는다 — VITE_는 빌드 시 공개 JS 번들에 그대로 들어가므로(2026-09-21 사고 원인), "이 값이
 * 진짜 비밀인지"를 따지기 전에 "이름 자체가 위험 패턴"이면 차단하는 게 맞다.
 *
 * .husky/pre-commit에서 `node scripts/check-staged-secrets.js`로 호출.
 * 종료 코드: 0 = 통과 / 1 = 의심 패턴 발견(커밋 차단)
 */

import { execSync } from 'node:child_process';

// 스캔에서 제외 — 값이 원래 비어있거나 플레이스홀더인 파일
const SKIP_FILE_RE = /(^|\/)\.env\.example$|(^|\/)\.env\.template$|\.lock$|package-lock\.json$/i;

// 알려진 실제 발급 형식(이름과 무관하게 값 자체로 판별 가능한 것들)
const KNOWN_SECRET_PATTERNS = [
  { name: 'Google API 키', re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: 'GitHub 토큰', re: /gh[pousr]_[A-Za-z0-9]{36,}/ },
  { name: 'Anthropic API 키', re: /sk-ant-[A-Za-z0-9_-]{20,}/ },
  { name: 'OpenAI류 API 키', re: /sk-[A-Za-z0-9]{20,}/ },
  { name: 'AWS 액세스 키', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'Slack 토큰', re: /xox[baprs]-[0-9A-Za-z-]{10,}/ },
  { name: '개인키 블록', re: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/ },
];

// 이름 자체가 위험한 패턴 — 값 내용과 무관하게 VITE_ 접두사 + 비밀류 이름이면 무조건 차단
const VITE_SECRET_NAME_RE = /VITE_\w*(SECRET|TOKEN|PASSWORD|PRIVATE_KEY|API_KEY)\w*\s*=\s*\S{4,}/; // secretlint-ignore (이 정규식 자체가 패턴 문자열이라 자기 자신에 오탐됨)

function getStagedFiles() {
  const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
  return out.split('\n').filter(Boolean).filter((f) => !SKIP_FILE_RE.test(f));
}

function getStagedContent(file) {
  try {
    return execSync(`git show :"${file}"`, { encoding: 'utf8' });
  } catch {
    return null; // 바이너리 파일 등 읽기 실패 시 스킵
  }
}

function scanFile(file) {
  const content = getStagedContent(file);
  if (content === null) return [];

  const findings = [];
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (/secretlint-ignore/.test(line)) return; // 명시적 예외 처리된 줄(오탐 확인 후 사람이 직접 표시)
    for (const { name, re } of KNOWN_SECRET_PATTERNS) {
      if (re.test(line)) findings.push({ file, line: i + 1, reason: `${name} 형식 값 발견` });
    }
    if (VITE_SECRET_NAME_RE.test(line)) {
      findings.push({ file, line: i + 1, reason: 'VITE_ 접두사 + 비밀류 이름에 값이 할당됨 (화면 공개 번들에 그대로 들어감)' });
    }
  });
  return findings;
}

const files = getStagedFiles();
let allFindings = [];
for (const f of files) {
  allFindings = allFindings.concat(scanFile(f));
}

if (allFindings.length > 0) {
  console.error('\n❌ 커밋 차단 — 비밀값으로 보이는 패턴이 스테이징된 파일에 있습니다 (값 자체는 출력하지 않음):\n');
  for (const f of allFindings) {
    console.error(`  ${f.file}:${f.line} — ${f.reason}`);
  }
  console.error('\n실제 비밀값이면: 이 줄을 지우고 서버(Secret Manager/Cloud Functions)로 옮기세요.');
  console.error('오탐(예시 코드·테스트용 가짜 값)이면: 그 줄에 " // secretlint-ignore" 주석을 붙이거나,');
  console.error('정말 예외가 필요하면 이 스크립트의 SKIP_FILE_RE에 파일을 추가하세요.\n');
  process.exit(1);
}

process.exit(0);
