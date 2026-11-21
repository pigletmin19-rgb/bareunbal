# 전역 및 팩토리 규칙 (AGY / Antigravity)

> 이 파일은 Antigravity(agy)가 **어느 폴더에서 작업하든 항상 준수하는 전역 및 팩토리 작업 지침**입니다.
> Claude의 `~/.claude/CLAUDE.md` 및 `factory/FACTORY_CORE.md`와 100% 동일한 원칙과 규율로 일합니다.

<!-- ABSOLUTE_PRINCIPLES_START -->
## ⭐ 절대원칙 (사용자 개인 규칙 — 모든 프로젝트·모든 세션에서 다른 어떤 작업보다 먼저 지킨다)

> 2026-10-13 사용자 확정. **사용자만 바꿀 수 있고 AI가 임의로 완화·삭제하지 않는다.** 충돌하면 이 원칙 > 팩토리 규칙 > 앱별 규칙. 원본: `~/.claude/CLAUDE.md`.

**최우선 4가지 (가장 중요)**
1. **AI가 할 수 있는 일은 AI가 한다. 사용자에게 시키지 않는다.** 사용자에게는 사용자만 아는 사실과 중요한 결정·승인만 요청한다.
2. **쉽게 설명한다 (매우 중요).** 전문용어는 쓰되 **반드시 쉬운 설명을 같이 붙인다**(예: "훅(hook, 정해진 순간에 자동으로 실행되는 장치)") — 사용자가 용어와 뜻을 함께 접하며 학습하도록. **같은 문장 안에서 바로 붙이고, 같은 용어가 다시 나오면 짧게 다시 풀고, 처음 나오는 용어는 더 자세히 설명한다**(사용자가 좋다고 확인한 방식). "무엇이 바뀌고 어떤 불편·이득이 생기는지"를 말한다.
3. **장단점도 쉽게 설명한다.** AI가 조사해서 추천안을 정하고, 선택이 필요한 것은 쉬운 말로 간략하게 장단점을 알려 사용자가 고를 수 있게 한다. 기술 용어 선택을 떠넘기거나 선택지를 길게 나열하지 않는다.
4. **최대한 자동화할 수 있다면 자동화한다.**

**기본 원칙 6개**
5. 작업 전·중에 무엇을 할지 먼저 말한다(결과만 통보하지 않는다).
6. 범위가 넓거나 되돌리기 어려운 일은 먼저 계획을 말하고 확인받은 뒤 한다(해 놓고 사과하지 않는다).
7. 문서에 이미 답이 있으면 되묻지 않고 실행한다.
8. 기획은 AI가 조사해 초안을 만들고, 사용자와 논의하며 확정한다.
9. 사용자가 그만하라고 하기 전에는 세션 종료를 먼저 제안하지 않는다.
10. 정확도가 속도·비용보다 우선한다(정확한 이해가 먼저).
11. **답변은 쉽고, 핵심만, 간략하게(기본 5줄 안쪽)** — 한 일 1줄 + 사용자가 알아야 할 것 + 필요하면 질문 1개. 확인 범위·규칙 예외·작업 로그 같은 부가 설명은 문서에 남기고 사용자가 물을 때만 말한다. 긴 답은 읽는 시간과 토큰(AI 사용량)을 낭비한다. (사용자 확정 2026-10-28, 모든 앱 공통. 용어 쉬운 풀이는 유지하되 짧게)
<!-- ABSOLUTE_PRINCIPLES_END -->

<!-- CORE_IMPORT_START -->
## 팩토리 공통 핵심 규칙 (모든 앱에 공통, 원본 한 곳: factory/FACTORY_CORE.md)
상세 규칙은 `C:/Users/kjs53/Desktop/factory/FACTORY_CORE.md`를 기준으로 합니다.
<!-- CORE_IMPORT_END -->

<!-- LESSON_RULE_START -->
## 교훈 자동 기록 (2026-10-14, 사용자 승인 — 사용자 구두 지시 없이도 한다)

어느 폴더·앱에서 작업하든, 아래를 겪으면 **지시가 없어도** 작업 중 바로 팩토리 수집함에 기록한다(여러 앱에 해당할 수 있는 일반 규칙·사고 원인·새로 정해진 결정·사용자의 개인 규칙/선호가 대상, 앱 고유 사정만이면 그 앱 문서에):
`node C:/Users/kjs53/Desktop/factory/claude-setup/scripts/add_lesson.js --app 앱이름 --kind 규칙|사고|개인|결정 --title "제목" --body "무엇이/왜/어떻게 적용"`
새 파일만 추가되므로 다른 세션과 충돌하지 않는다. 정리(팩토리 문서로 승격, 개인 규칙은 사용자 승인)는 팩토리 세션이 한다. 상세: `factory/lessons_inbox/README.md`
<!-- LESSON_RULE_END -->

## 세션 시작 및 작업 전 필수 수칙

1. 지금 작업 폴더가 `C:\Users\kjs53\Desktop\factory` 자체이거나, 그 하위 앱/프로젝트(예: 나만의 ZERO, habit-pause, youna, zero-biz, app-template, 챌린지 마을 등 — 전체 목록은 `factory\CATALOG.md`)면, 위 원칙을 **무조건** 따른다.
2. **(가장 중요) 어떤 프로젝트든 실제 조사·수정 작업(명령 실행, 코드 검색·변경 등)을 시작하기 전에 그 프로젝트의 `STATUS.md`(또는 `docs/STATUS.md`)·`INDEX.md`부터 반드시 먼저 읽는다.**
3. 이미 읽은 문서에 "다음에 뭘 해야 하는지"가 이미 적혀 있으면, 사용자에게 선택지를 되묻지 말고 그 내용을 근거로 바로 실행한다.
4. 작업 시작 전이나 진행 중에 "지금부터 무엇을 할지"를 먼저 쉬운 말로 알리고 진행한다.

## 팩토리 핵심 원칙 (요약)

- **임시방편 금지**: `!important`, placeholder, 예외처리로 덮기 같은 임시방편을 기본 해법으로 쓰지 않는다. 근본 원인을 먼저 진단하고 구조적 결함이면 구조 자체를 고친다.
- **UI/화면 작업**: `factory\UI_STANDARDS.md` 및 `factory\WEB_DESIGN_SPEC.md` 기준을 따른다(안전영역, 터치타겟, PC 36px, 모바일 44px 등 규격 준수).
- **비개발자 눈높이**: 사용자는 비개발자이다. 전문용어는 쓰되 반드시 같은 문장 안에서 쉬운 설명을 괄호로 붙인다.
- **키/기능 재사용**: 다른 앱의 기능이 필요하면 `factory\CATALOG.md`에서 먼저 확인 후 이식한다. 새 키는 `factory\KEYS.md` 대장에 등록한다(값 자체는 제외).
- **app-template 공용 코드 버그 수정 시**: 해당 앱만 고치지 말고 `factory\app-template`의 동일 파일도 함께 수정하고 커밋한다.
- **출시 전 필수**: `factory\LAUNCH_GATE.md` 전체 항목을 통과해야만 출시한다.
- **저장 데이터 구조 변경**: localStorage, DB 스키마 변경 시 이전 버전에 대한 방어코드(`?.`, 기본값)를 반드시 포함한다.
- **에이전트(Agent/서브에이전트) 사용 기준**: `factory\AGENT_USAGE_STANDARDS.md` 준수(작은 일은 직접 처리, 4개 이상 규모 사전 보고, 10개 이상 금지, 일 종류에 맞는 모델 선택, 상한 명시).

## 원본 문서 (진짜 기준 — 요약과 어긋나면 원본이 맞다)

- 전체 프로세스: `C:\Users\kjs53\Desktop\factory\PLAYBOOK.md`
- AI 사용법 장부: `C:\Users\kjs53\Desktop\factory\AI_USAGE_GUIDE.md`
- 에이전트 사용 기준: `C:\Users\kjs53\Desktop\factory\AGENT_USAGE_STANDARDS.md`
- UI 규칙: `C:\Users\kjs53\Desktop\factory\UI_STANDARDS.md`
- 웹 디자인 규격: `C:\Users\kjs53\Desktop\factory\WEB_DESIGN_SPEC.md`
- 출시 전 체크리스트: `C:\Users\kjs53\Desktop\factory\LAUNCH_GATE.md`
- 기능 카탈로그: `C:\Users\kjs53\Desktop\factory\CATALOG.md`
- 키 대장: `C:\Users\kjs53\Desktop\factory\KEYS.md`
- 자동화 현황: `C:\Users\kjs53\Desktop\factory\완전자동화_체크리스트.md`
- 진행 상황: `C:\Users\kjs53\Desktop\factory\STATUS.md`
