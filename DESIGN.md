---
name: prep study room
description: A calm, pastel study room for late-night engineering revision.
colors:
  canvas: "#FAFAF8"
  surface: "#FFFFFF"
  ink: "#1F2430"
  muted: "#667085"
  line: "#E7E8ED"
  hover: "#F1F1F4"
  lavender-bg: "#F0ECFF"
  lavender-ink: "#6853ae"
  blue-bg: "#EAF2FF"
  blue-ink: "#365f9d"
  blush-bg: "#FCECEF"
  blush-ink: "#a34561"
  mint-bg: "#EDF6EE"
  mint-ink: "#476c4f"
  peach-bg: "#FFF0E5"
  peach-ink: "#965b35"
  dark-canvas: "#202329"
  dark-surface: "#272b33"
  dark-ink: "#edeef3"
  dark-muted: "#b4b9c7"
  dark-line: "#3c424e"
  dark-hover: "#333844"
  dark-lavender-bg: "#343046"
  dark-lavender-ink: "#c2b2ef"
  dark-blue-bg: "#2b3749"
  dark-blue-ink: "#afc9f0"
  dark-blush-bg: "#45323c"
  dark-blush-ink: "#edb2c5"
  dark-mint-bg: "#2d3c35"
  dark-mint-ink: "#b0cdb7"
  dark-peach-bg: "#42372f"
  dark-peach-ink: "#e3bd9e"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  editorial-title:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.2
  headline:
    fontFamily: "'DM Sans', Outfit, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'DM Sans', Outfit, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "'DM Sans', Outfit, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "calc(16px * var(--reading-scale))"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'DM Sans', Outfit, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0"
  code:
    fontFamily: "'JetBrains Mono', source-code-pro, Menlo, Monaco, Consolas, monospace"
    fontSize: ".86em"
rounded:
  key: "4px"
  action: "7px"
  control: "8px"
  tile: "10px"
  surface: "12px"
  dialog: "14px"
  pill: "99px"
spacing:
  compact: "8px"
  small: "12px"
  regular: "16px"
  roomy: "20px"
  section: "24px"
  panel: "28px"
  page: "32px"
components:
  button-primary:
    backgroundColor: "{colors.lavender-ink}"
    textColor: "#fff"
    rounded: "{rounded.action}"
    padding: "10px 16px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.action}"
    padding: "10px 8px"
  field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "9px 10px"
    height: "40px"
  navigation-active:
    backgroundColor: "{colors.lavender-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "43px"
  completion-chip:
    backgroundColor: "{colors.mint-bg}"
    textColor: "{colors.mint-ink}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.6rem"
  subject-tile:
    backgroundColor: "{colors.lavender-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "16px"
  callout:
    backgroundColor: "{colors.blue-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px 20px"
  resume-panel:
    backgroundColor: "{colors.lavender-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "28px"
---

# Design System: prep study room

## Overview

**Creative North Star: "The Late-Night Study Room"**

prep is a calm, easy, quietly alive place to revise. Near-white paper, soft subject-colored surfaces and readable ink give the interface the feeling of a furnished study space. Warm editorial headings welcome students; precise sans-serif controls and notes support sustained reading.

The desk, subject atlas, notebook, practice and lab share one material vocabulary. Character comes from subject-specific line diagrams, measured spacing and brief feedback. Dark mode translates the same materials into charcoal and dusty pastels. Neon, gaming intensity, glassmorphism and decorative rainbow gradients are rejected by the approved direction.

**Key Characteristics:**

- Soft pastel families with readable foregrounds.
- Editorial greetings and practical sans-serif study content.
- Thin borders and tonal layers rather than lifted dashboard cards.
- Subject-specific line diagrams and restrained interaction feedback.
- Reading layouts that simplify as space narrows.

Recorded from `IOT/style.css`, its final overrides in `IOT/experience.css`, `IOT/index.html`, `IOT/experience.js` and `IOT/app.js`; visually checked against the desktop, mobile-reader and dark-reader review captures. This describes the implemented interface, with the approved direction in `docs/STUDY_ROOM_IMPLEMENTATION.md` as context.

## Colors

The palette is paper and ink with five low-intensity color families; the frontmatter records final rendered tokens, including the darker light-mode accent inks added after the original proposal.

### Primary

- **Study Lavender:** the primary action, active navigation, planning, theory and saved-study emphasis. A family surface pairs with its ink through the component's local family variables.

### Secondary

- **Notebook Blue:** notes, technical material, current topics and explanation surfaces.
- **Completion Mint:** completed work, reassurance and success feedback.

### Tertiary

- **Review Blush:** incorrect answers and review context.
- **Practice Peach:** quick practice, deadline context and warning surfaces.

### Neutral

- **Paper Canvas / White Surface:** page and content layers.
- **Study Ink / Supporting Ink:** primary and secondary copy.
- **Paper Line / Hover Wash:** fine separators and quiet interaction states.
- **Charcoal Canvas / Charcoal Surface:** the dark equivalents, with pale text and dusty family inks. The final dark values apply to both the root when it contains a dark-theme body and the body itself, keeping inherited family tokens coherent.

**The One Family Rule.** A component uses one pastel family for its surface, icon and emphasis; text stays readable against that surface.

**The Same Room Rule.** Theme changes replace shared materials across the whole interface; terminal darkness belongs inside code and execution surfaces.

## Typography

**Display Font:** Newsreader with Georgia and Times New Roman fallbacks.

**Body Font:** DM Sans with Outfit and platform sans-serif fallbacks.

**Label/Mono Font:** UI labels use the body family; code uses JetBrains Mono with monospace fallbacks.

**Character:** Newsreader lends warmth to the home greeting, resume subject, overview and occasional dialog or empty-state heading. DM Sans handles the reader, navigation, questions and controls; code remains recognizably technical.

### Hierarchy

- **Display:** home greeting; smaller on mobile (29px, then 27px at the narrowest breakpoint).
- **Editorial title:** resume subject; the atlas overview also uses a larger editorial heading (36px desktop, 30–31px narrow).
- **Headline:** reader title, reduced slightly on mobile (26px). Reader section headings scale with the reading text (1.6em / 1.3 for h2, 1.2em for h3).
- **Title:** subject gallery and progress headings.
- **Body:** reading copy stays within 72ch; its line-height becomes 1.8 on mobile. Reading-size preference changes the multiplier from 0.9 to 1.5. Supporting product copy uses 13–15px.
- **Label:** compact metadata and functional captions; navigation and buttons commonly use 13px. The mobile dock uses 10px labels with icons and large hit areas.

**The Quiet Notebook Rule.** Notes, controls, MCQs and code use their functional sans-serif or mono face; editorial type marks the surrounding study room.

## Layout

The application occupies the viewport with independently scrolling content. A three-column header is 66px tall on desktop. The home context rail is 190px wide, becoming 160px at 1180px; study views and widths at or below 900px use a 64px icon rail. Main desk content is centered within 1380px, with fluid side padding and a dominant main column beside a 300px support column (320px at 1500px and above). Section gaps cluster around the spacing scale in the frontmatter.

At 1180px and below, desk support moves beneath the main column and practice becomes one column. Subject tiles use four columns, then two at 900px. The subject gallery uses an auto-fitting grid with a 260px minimum when space permits. The chapter atlas is a horizontal rail with touch, drag, arrow buttons and keyboard access; its tiles are 225px wide on desktop and 205px on mobile.

The notebook has a 250px topic outline, reading content and a compact 248px memory rail. The memory rail yields at 1370px; the remaining reader is centered within 850px and retains its 72ch text measure. The outline narrows to 220px at 900px. Tables and code remain horizontally accessible inside the reading column.

At 700px and below, the header is 60px, the desktop rail disappears and a fixed 64px bottom dock includes the safe-area inset. The outline becomes a fixed drawer below the header (up to 320px or 88vw); memory opens in a native dialog. Header and principal mobile controls receive 44px targets. Home support and atlas support stack, and reading padding becomes 25px 22px 35px. At 390px and below, the resume illustration disappears and the resume panel becomes one column.

Focus mode hides navigation, outline, memory and dock to center the work. Print removes chrome, expands the article and uses 11pt reading text. Dialogs are viewport-bounded, with internal scrolling rather than page overflow.

## Elevation & Depth

The normal interface is flat. Pastel fills, fine family-tinted borders and neutral separators establish containment. Subject and chapter cards have no box shadow, including on hover. The dark theme preserves the same hierarchy with tonal charcoal layers.

### Shadow Vocabulary

- **Side-panel separation** (`-8px 0 30px rgb(0 0 0 / 8%)`): saved-note and profile panels only.
- **Dialog backdrop** (`rgb(32 35 45 / 35%)`): native modal separation; the drawer scrim uses the same ink at 30%.

**The Tonal Depth Rule.** Use surface color and a fine border for ordinary panels; reserve overlay separation for actual dialogs and side panels.

## Shapes

Controls are gently curved, cards slightly broader and dialogs softer again. The frontmatter captures the recurring radius vocabulary: action, control, tile, surface and dialog. Thin one-pixel borders follow the component's family ink mixed into the neutral line. Pills belong to progress tracks, completion markers and compact account controls. Line illustrations use fine SVG strokes and the component family ink; they describe the subject rather than introducing a second illustration style.

## Components

### Buttons

Compact, readable actions. Primary buttons use family ink, white text in light mode and a gently curved action radius; the dark override uses dark text on pale family ink. Their minimum height is 40px on desktop and 44px for mobile primary actions. Hover darkens via brightness (0.94). Ghost actions are unfilled with family-colored text; hover adds a 12% family-ink wash. Lab run/submit actions use lavender and a slightly tighter 6px radius. Disabled buttons keep a default cursor; the component's existing engine owns the disabled state.

Every keyboard-focusable control receives a two-pixel lavender outline with a two-pixel offset. Preserve this focus-visible rule even where a component resets its own outline. Icon controls use inline line SVGs and accessible names; they grow from 36px desktop targets to 44px mobile targets.

### Chips

Completion metadata is a mint pill with compact padding and a semibold label. Section metadata uses the relevant accent. These are status indicators, not decorative heading kickers; text communicates the state alongside color.

### Cards / Containers

Resume panels use the surface radius, family fill, a fine mixed border and roomy padding. Subject strip tiles use the tile radius and compact padding; gallery versions use the surface radius and more space. Both carry a subject diagram, title and functional progress or section metadata. Hover lifts subject tiles by 3px and gallery tiles by 4px while strengthening the border. Support cards and memory cards use the same family/neutral border vocabulary at their own density.

### Inputs / Fields

Settings selects and exam fields use canvas fill, a one-pixel neutral border, action radius and 40px minimum height. The command-search entry is a quiet bordered header control; its dialog has a prominent borderless query field and keyboard-operable result rows. Results use a hover wash and family-colored icon inset. Empty results use plain explanatory text, and loading uses static line placeholders.

### Navigation

The desktop rail uses compact icon/text rows with muted default text, a neutral hover wash and lavender active surface. In study mode it reduces to icons while the topic outline carries local context. Topic selection uses blue; section selection uses lavender. Mobile uses a fixed labeled dock with a lavender current item and a drawer for topic navigation. Utility controls fold into Settings on mobile.

### Resume and notebook materials

The sentence-case “Resume…” context above the subject heading is a sanctioned functional label from the approved reference; retain its placement without generalizing it into decorative eyebrows. The resume panel pairs meaningful progress with a direct action and a subject diagram.

Reading callouts are full softly tinted surfaces with a fine border and control radius, not heavy side stripes. Light-mode warning and tip surfaces use peach and mint; the final dark override unifies callout variants on blue. Inline code uses lavender; fenced code and terminal output may use localized dark panels. Keep tables, code copying, the two-pixel reading progress line and the memory rail quiet and functional.

### Motion and feedback

Navigation and state feedback generally use 140–200ms transitions; the shared easing is `cubic-bezier(0.25, 1, 0.5, 1)`. Dialog entry fades and settles 8px over 180ms. The mobile outline drawer uses 220ms. Saved panels retain their existing 320ms slide. Optional gentle wheel smoothing is bounded and reader-only; native scrolling remains the baseline.

Both the saved motion preference and `prefers-reduced-motion` reduce CSS animation and transition durations to .01ms, stop repeated animations and restore automatic scrolling. Existing subject/chapter hover transforms are removed under the system preference. New motion should follow these existing controls; do not add animation beside long notes. MCQs confirm with mint and review with blush while retaining text and explanation; timed practice defers answer feedback until finish.

## Do's and Don'ts

### Do:

- **Do** pair pastel surfaces with readable ink and keep one family within each component.
- **Do** reuse the shared tokens for every theme, including notebook and lab chrome.
- **Do** preserve visible keyboard focus, labeled icon controls and mobile hit areas.
- **Do** let reading content keep its measure while secondary rails yield to space.
- **Do** keep subject diagrams, status feedback and motion tied to a useful action or concept.
- **Do** honor system and saved motion preferences.

### Don't:

- **Don't** introduce neon, gaming intensity, glassmorphism or decorative rainbow gradients.
- **Don't** spread terminal darkness outside actual code and execution surfaces.
- **Don't** add generic decorative eyebrows; the approved functional Resume label is a specific exception.
- **Don't** turn ordinary cards into floating shadow stacks or animate beside long notes.
- **Don't** rely on color alone for selection, completion or answer feedback.

Not canonized: legacy content can carry inline styling or glyph callout icons, and some older programmatic scrolling calls request smooth behavior directly. These are compatibility residue, not rules for new surfaces; this documentation pass does not repair runtime or content drift.
