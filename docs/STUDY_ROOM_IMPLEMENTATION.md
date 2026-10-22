# prep study-room implementation handoff

## Direction contract

Approved authority: `Redesign_plan.md`, the three generated Study Desk / Learning Atlas / Focused Notebook references, and the user's explicit pastel-only correction. This is a code-led completion of an existing partially implemented interface, not a new visual-world exploration or a pixel-diff reproduction of mock content.

The whole product is one calm study room. Near-white paper, soft lavender/blue/blush/mint/peach surfaces, dark readable text, DM Sans UI and notes, Newsreader editorial greetings, and JetBrains Mono code are shared throughout. Dark mode translates those materials into charcoal and dusty pastels. No neon, scroll narratives inside notes, distracting autoplay, decorative video, or new animation framework.

First viewport: compact subject/search/utilities header, persistent contextual navigation, one dominant resume/discovery panel, a quiet subject strip, and secondary exam/practice context. On narrow screens, a bottom dock replaces desktop navigation; content remains single-column. Reader composition is outline / notes / memory, with the memory rail yielding before the outline at smaller widths.

Signature interaction: subject-specific line diagrams lead into a horizontally navigable chapter atlas, then a stable, readable notebook. Gentle wheel smoothing is optional and reader-only; native keyboard, touch, lab editors, reduced motion, and system expectations remain intact. Motion uses short fades and restrained positional feedback, not spectacle beside study text.

Pinned-reference exception: keep the functional “Resume…” context above the subject heading. The user approved that placement. It is sentence-case, not a decorative uppercase eyebrow.

## What existed at the audit

The project already had a substantial partial redesign: Study Desk composition, subject atlas, focused reader, saved notes, MCQ logic, lazy subject banks, Java/Linux practice, and Firebase authentication. It was not a blank rebuild.

Remaining gaps were the shared shell, useful global search and settings, mobile navigation/drawers, consistent dark mode and lab styling, actual activity/progress wiring, recoverable loading, and redundant entry points. Existing unrelated changes and generated subject material were preserved.

Content audit loaded all nine subject configurations: 345 topic records (including lab/test records) and 804 MCQs. No exact duplicate note bodies were found. Useful teaching content was not deleted. Redundancy removal instead collapses course details, replaces repeated resume/recent links with saved revision access, removes the persistent crowded header controls, and removes browser shortcut/context-menu blocking.

## Delivered by phase

| Phase | Delivered |
| --- | --- |
| 0 — Audit and foundation | Existing vanilla architecture and lazy loaders retained; source-backed progress counts; shared palette, type, responsive and interaction layer; UI regression checks. |
| 1 — Global shell | Subject switcher; universal notes/question search with keyboard navigation; desktop context rail; mobile dock; native settings/search dialogs; theme, reading-size, motion and scroll preferences. Mobile account access lives in Settings. |
| 2 — Study Desk | First-visit discovery and returning-study resume; real activity and mastery; pastel subject strip; contextual exam dates editable on-device; quick practice. |
| 3 — Learning Atlas | Unified subject gallery, subject-specific SVG diagrams, horizontal chapter rail with drag/touch/arrows/keyboard controls, meaningful continue/practice/saved actions, collapsible course details. |
| 4 — Focused Notebook | Outline, breadcrumb/title/read-time/progress, memory rail, mobile outline drawer and memory dialog, reading-position restoration, code copying, calmer callouts, adjustable text, focus mode and print styling. |
| 5 — Practice and labs | Shared MCQ workspace and question map, calm answer/review states, timed practice with feedback withheld until finish, saved content and progress views, coherent Java/Linux editor/output chrome, keyboard-resizable panes and focus layout. Existing practice engines remain authoritative. |
| 6 — Motion and quality | Reduced-motion support, optional bounded reader-wheel smoothing, short transitions, lazy loading/retry and stale-navigation protection, mobile target corrections, desktop/mobile/dark screenshots and independent finish review. |

## Architecture and source map

- `IOT/index.html`: semantic application shell, assets and script order.
- `IOT/style.css`: incumbent application/component CSS; legacy dark-reader/lab colors now resolve through shared tokens.
- `IOT/experience.css`: final shared system and responsive finish; dark palette; dialogs, gallery, navigation, focus and print.
- `IOT/experience.js`: small shared experience layer over existing application state/loaders. No new frontend runtime dependencies.
- `IOT/app.js`: existing subject, reading, saved-note and practice engines; shared navigation/activity integrations and loader resilience.
- `IOT/firebase-auth.js`: existing auth/cloud logic, extended activity keys and view-aware refresh.
- `tools/tests/study-experience.test.js`: focused assertions for progress, content search, preferences, timed persistence, retry and navigation guards.
- `DESIGN.md` and `.impeccable/design.json`: reusable design contract and component/motion metadata for subsequent work.

Palette inks are intentionally darker than the original proposal on light pastel backgrounds to improve text contrast without changing the soft material character. The header is 66px desktop / 60px mobile rather than the proposal's approximate 64px / 56px; touch targets take priority over those approximate dimensions. The desktop memory rail is compact and becomes a native dialog on narrower screens. Existing saved-note/highlight infrastructure is reused rather than introducing a second annotation database.

Local storage keeps existing subject answers/mastery and saved-note keys. New preferences use `prep_preferences`, activity uses `prep_study_activity` and `prep_recent_topics`, and unfinished timed practice uses `prep_timed_quiz`. Reading positions are device-local and bounded. Exam dates and preferences remain device-local; the existing authenticated sync covers study activity/progress, not every UI preference. No migration deletes prior data.

## Verification and launch limits

Local preview: from the repository root run `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173/IOT/`. The frontend requires no package installation or bundling. This static preview is not a substitute for the deployed `/api/execute` service used by Java execution. Existing backend/judge start commands remain in root `package.json`.

Passed: `npm run test:frontend`, `npm run test:vercel`, JavaScript syntax checks. Browser checks covered global content search and topic navigation, subject lazy-loading and retry, mobile outline/memory/settings/account access, dark/light preferences, 390px layout without page overflow, Linux sample execution (5/5 sample tests), and timed MCQ selection/finish feedback. Screenshots are under `.impeccable/review/` (local QA artifacts, not application image assets).

Do not describe `test:all` as a clean end-to-end pass: its legacy executor smoke prints a Java compilation error for the old signature-wrapper path (`solve(Node, int)` missing), despite returning exit code zero. That backend path was not rewritten as part of this visual project. Judge dependency restoration also reported five existing locked-package advisories (one low, two moderate, one high, one critical); dependencies were not automatically upgraded. Investigate these before public execution-service launch.

Live Google sign-in/cloud reconciliation and the deployed Java execution service still need credentialed deployment testing. Physical Windows/Android/iOS devices and Safari/Firefox were not available in this local browser run. No full WCAG certification, production performance audit, public deployment, or backend security certification is claimed.

One narrowly scoped design-detector exception exists: the static compiler dialog delegates spacing to its padded header/body/footer rather than the dialog wrapper. The suppression applies only to `cramped-padding` in `IOT/index.html`; no visual or accessibility failure was waived.

Independent finish review: **ship** after the bounded correction pass. All four findings were resolved (direction documentation, unified dark-reader materials, mobile touch targets, pinned functional context-label exception). Eight screenshots were valid, including desktop, mobile, atlas, gallery, reader, dark reader, and the actual 922px app-panel viewport. This verdict covers those visible fixes, not live services, physical devices, or a formal accessibility certification.

## Research and continuation

- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines): control semantics, keyboard behavior, feedback, reduced motion and layout guidance.
- [Vercel Agent Skills / Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines): installed as the requested additional GitHub design skill; used as interface-review guidance.
- [LifeAt](https://lifeat.io/): reference for quiet study atmosphere, not copied content or a replacement for the approved composition.

Keep new surfaces within the documented system. Do not add new landing-page branding, fake statistics/streaks, duplicate study content, a second state framework, or more motion libraries to make this feel “alive.” Complete credentialed service/device validation before calling the public launch ready.
