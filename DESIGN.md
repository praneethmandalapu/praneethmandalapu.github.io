---
colors:
  primary: "#C6A97C"
  onyx-bg: "#121110"
  onyx-surface: "#1A1816"
  onyx-raised: "#211E1A"
  onyx-text: "#EDE5D8"
  onyx-text-secondary: "#A69D8F"
  onyx-accent: "#C6A97C"
  onyx-hairline: "rgba(237, 229, 216, 0.12)"
  ivory-bg: "#F6F2EB"
  ivory-surface: "#FBF9F4"
  ivory-raised: "#EFEAE0"
  ivory-text: "#2A2622"
  ivory-text-secondary: "#6E675F"
  ivory-accent: "#7E5D36"
  ivory-accent-soft: "#C6A97C"
  ivory-hairline: "rgba(42, 38, 34, 0.12)"
typography:
  display-hero:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "7.5rem"
    fontWeight: 480
    lineHeight: "1.02"
    letterSpacing: "-0.02em"
  display-section:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "4rem"
    fontWeight: 480
    lineHeight: "1.08"
    letterSpacing: "-0.015em"
  heading-item:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "1.9rem"
    fontWeight: 500
    lineHeight: "1.2"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "1.65"
  body-small:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.6"
  eyebrow:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.25em"
    textTransform: "uppercase"
  meta-mono:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  shell: "20px"
  core: "12px"
  pill: "999px"
spacing:
  section: "clamp(6rem, 12vw, 13rem)"
  section-tight: "clamp(4rem, 8vw, 8rem)"
  gutter: "clamp(1.5rem, 5vw, 4rem)"
  stack-lg: "clamp(2.5rem, 5vw, 4.5rem)"
  stack-md: "1.75rem"
  stack-sm: "1rem"
components:
  nav:
    backgroundColor: "{colors.onyx-bg}"
    textColor: "{colors.onyx-text}"
    typography: "{typography.meta-mono}"
    height: "72px"
  button-primary:
    backgroundColor: "{colors.onyx-text}"
    textColor: "{colors.onyx-bg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "10px 10px 10px 28px"
  eyebrow-tag:
    textColor: "{colors.onyx-accent}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.none}"
    padding: "0px"
  project-card-shell:
    backgroundColor: "{colors.onyx-surface}"
    rounded: "{rounded.shell}"
    padding: "8px"
  project-card-core:
    backgroundColor: "{colors.onyx-raised}"
    rounded: "{rounded.core}"
    padding: "clamp(1.75rem, 3.5vw, 3rem)"
  experience-row:
    backgroundColor: "{colors.onyx-bg}"
    textColor: "{colors.onyx-text}"
    typography: "{typography.body}"
    padding: "2.25rem 0"
motion:
  ease-luxury: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-perpetual: "cubic-bezier(0.45, 0, 0.55, 1)"
  duration-reveal: "1100ms"
  duration-hover: "600ms"
  duration-theme-veil: "900ms"
  duration-pulse: "2200ms"
  duration-underline: "500ms"
shadows:
  inner-highlight: "inset 0 1px 1px rgba(255, 255, 255, 0.06)"
  card-lift: "0 24px 48px -24px rgba(0, 0, 0, 0.35)"
containers:
  luxury-page: "1200px"
  read-measure: "62ch"
  hero-max: "1100px"
breakpoints:
  collapse: "768px"
  wide: "1200px"
borderWidths:
  hairline: "1px"
opacity:
  hover-dim: "0.7"
  hairline-strong: "0.24"
zIndex:
  nav: "40"
  veil: "50"
scrollTriggers:
  reveal-start: "top 82%"
---

# Praneeth Reddy Mandalapu — Portfolio Design System

## 1. Overview

A single-page personal portfolio in the **Corporate Luxury** archetype, carrying two switchable expressions of the same identity: **Onyx** (dark luxury — the Rolex/Bugatti register; deep warm near-black, cream serif type, champagne-gold accents) and **Ivory** (flat editorial luxury — the Hermès/Aesop register; warm cream foundation, ink type, bronze accents). Onyx is the default. The theme switch is not a utility control; it is the site's identity made interactive.

**Atmosphere calibration** — Density **2** (gallery-airy: one idea per viewport, 200px-class section padding), Variance **4** (structured surprise: asymmetric section anchors within a disciplined 1200px container, no broken grids), Motion **6** (purposeful-plus: slow masked reveals on scroll, an ambient silk field behind the hero, one signature transition — nothing hurries, nothing loops loudly).

**Signature moment** — the Onyx ⇄ Ivory transition. Activating the theme control sweeps a slow radial veil across the page from the toggle's position (View Transitions API, `{motion.duration-theme-veil}` paced by `{motion.ease-luxury}`), reading as gallery lights dimming rather than a stylesheet swap. Fallback for non-supporting browsers is a full-surface cross-fade at the same pace.

**Second-read moment** — the hero name ends in a single full stop set in `{colors.onyx-accent}` gold. Noticed on the second visit, never announced.

**Perpetual motion** (Motion ≥ 5 mandate) — two elements, both in the hero fold, reinforcing the same focal point. (1) The **silk field**: a full-bleed WebGL fragment shader behind the hero rendering slow, domain-warped fabric folds in the active theme's surface colors with a champagne sheen; it renders at reduced resolution, pauses when off-screen or the tab is hidden, and is removed entirely by the Motion control or `prefers-reduced-motion`. (2) The breathing gold status dot beside the current-role line, pulsing on a `{motion.duration-pulse}` cycle, CSS-only. No perpetual motion exists below the hero fold.

**Motion control** — a "Motion / Still" text switch in the navigation (styled identically to the theme control) toggles the silk field. "Still" reverts the hero to its flat, type-only expression. The choice persists in `localStorage`; first-visit default follows `prefers-reduced-motion`.

**Photography direction** — none. The site uses no photography or stock imagery; typographic scale, tonal bands, and hairline rules carry the material quality. Any future imagery must be treated (duotone toward the active theme's foundation) and framed as object, never decoration.

**Copy register** — sentence case everywhere, including headlines. Understated, factual, first person avoided in headings. No exclamation marks, no marketing verbs. Dates, locations, and course codes set in mono as archival metadata — the résumé as catalogue raisonné.

## 2. Colors

Color rests on warm neutral foundations punctuated by a single champagne-gold accent. Nothing saturated, nothing cool: both themes share the same warm hue axis so the switch reads as lighting, not rebranding.

**Onyx (default)** — `{colors.onyx-bg}` is a warm near-black (never `#000`); `{colors.onyx-surface}` and `{colors.onyx-raised}` step upward in lightness for card shells and cores. Type is cream `{colors.onyx-text}` (never `#FFF`), secondary text `{colors.onyx-text-secondary}` (warm gray, ≥4.5:1 on the foundation). The gold `{colors.onyx-accent}` (7.5:1 on `{colors.onyx-bg}`) appears as signal only: the eyebrow labels, the hero full stop, the status dot, active markers. One accent per surface.

**Ivory** — `{colors.ivory-bg}` warm cream foundation with `{colors.ivory-surface}` for lifted panels and `{colors.ivory-raised}` as a sunken tonal band for section contrast. Ink `{colors.ivory-text}` primary, `{colors.ivory-text-secondary}` secondary (≥4.5:1). Text-bearing accents use bronze `{colors.ivory-accent}` (≥4.5:1 on cream); the lighter champagne `{colors.ivory-accent-soft}` is reserved for decorative hairlines and the status dot where contrast is not load-bearing.

Hairlines are the palette's connective tissue: `{colors.onyx-hairline}` / `{colors.ivory-hairline}` at `{borderWidths.hairline}`, rising to `{opacity.hairline-strong}` on hover or active states. No pure grays, no blue-tinted neutrals, no gradients as design elements, and never the purple–pink AI gradient in any form.

## 3. Typography

The serif is the mark. **Bodoni Moda** (variable, optical sizing enabled) serves all display work — the Didot/Bodoni-adjacent face the archetype calls for, loaded via `next/font` with `font-display: swap`. **Hanken Grotesk** carries body copy at 400. **IBM Plex Mono** carries metadata: dates, locations, course codes, eyebrow labels — the technical register that fits an ML engineer without breaking the luxury voice.

- Hero name: `{typography.display-hero}` — lands in exactly two lines on desktop inside `{containers.hero-max}` (2-line iron rule), tight `-0.02em` tracking.
- Display tokens carry the maximum scale; implementation interpolates fluidly — `display-hero` renders as `clamp(3.4rem, 8vw, 7.5rem)`, `display-section` as `clamp(2.2rem, 4.5vw, 4rem)`, `heading-item` as `clamp(1.4rem, 2.2vw, 1.9rem)` — so type never jumps at a breakpoint.
- Section openers: `{typography.display-section}` in sentence case. Never Title Case.
- Item headings (roles, projects): `{typography.heading-item}`.
- Body: `{typography.body}` capped at `{containers.read-measure}`.
- Eyebrows: `{typography.eyebrow}` in gold/bronze, set 28px above their headline, carrying meaning ("Experience", "Selected work") — never index numbers.
- All numerals in date columns use `font-variant-numeric: tabular-nums`. Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Ellipses are `…`, quotes are curly.

Kinetic behaviour is restrained to masked line reveals: hero lines rise from a 110% translate behind an overflow mask at `{motion.duration-reveal}` with `{motion.ease-luxury}`, staggered 90ms. No per-character splitting, no variable-font animation — the serif is felt before it is noticed.

## 4. Layout

One page, seven movements, each with a different composition anchor so no two consecutive sections share a shape (composition variety mandate):

1. **Hero** — centered statement (Cinematic Center), full-viewport (`min-height: 100svh`), eyebrow + two-line name + one supporting paragraph + primary CTA pair + status line. Background is the ambient silk field (or the flat foundation color when the Motion control is set to Still); the shader keeps a calm wash at center so the type always reads.
2. **Experience** — left-third sticky serif label, right two-thirds editorial list with hairline dividers. Top-left lead anchor.
3. **Selected work** — dominant lead Doppelrand card (OncoPulse) filling a tall left column at ~58% width, with two supporting cards (SlugSync, subwoofer) stacked in the right column. Never equal thirds.
4. **Capabilities** — diptych on the raised tonal band (`{colors.ivory-raised}` / `{colors.onyx-surface}`): left serif statement, right three mono-labelled skill groups. Left-third + right-two-thirds anchor.
5. **Education & honors** — mini section, single centered column, tight: the archival register. Small ambition on purpose (section size variety).
6. **Contact** — bottom-anchored statement with a full-width banner-style email link (CTA shape variation from the hero's pill).
7. **Footer** — one hairline, one line of mono metadata.

Content binds to `{containers.luxury-page}` with `{spacing.gutter}` inline padding. Section rhythm uses `{spacing.section}`; the education movement uses `{spacing.section-tight}`. Reading copy never exceeds `{containers.read-measure}`.

**Scroll choreography** — sections reveal once, on entry at `{scrollTriggers.reveal-start}`, via IntersectionObserver adding a `.is-visible` class: opacity 0→1 with an 24px rise over `{motion.duration-reveal}` on `{motion.ease-luxury}`, children staggered ≤90ms. No scroll hijacking, no pinning, no parallax beyond 5%.

**Responsive strategy** — mobile-first. Below `{breakpoints.collapse}`: every asymmetric anchor collapses to a single column (`w-full`, gutter padding, vertical stacks); the sticky label unsticks; the dominant/supporting card pair stacks with generous gaps; nav reduces to wordmark + theme control. `100svh` for the hero, never `vh`. Verified at 375px, 414px, 768px with no horizontal scroll and 44×44 touch targets.

## 5. Elevation & Depth

Depth is material, not atmospheric. Cards use the Doppelrand double-bezel: an outer shell (`{components.project-card-shell}`, hairline ring, `{rounded.shell}`) holding an inner core (`{components.project-card-core}`, `{rounded.core}`) whose radius is mathematically concentric — `{rounded.core}` equals `{rounded.shell}` minus the 8px shell padding, implemented as `calc(20px - 8px)`. The core carries `{shadows.inner-highlight}` — ambient light catching a machined edge — and the shell lifts on `{shadows.card-lift}` only in Onyx, where the dark foundation can absorb it. Ivory relies on tonal contrast alone: surface against raised band, no drop shadows.

The fixed navigation is the only translucent surface: theme-tinted at 80% opacity with `backdrop-filter: blur(12px)` — permitted because it is fixed, never on scrolling content. A 1px hairline underlines it once the page has scrolled.

Nothing else floats. No outer glows, no layered nested containers beyond the single Doppelrand pair, no z-axis theatrics. `{zIndex.nav}` and `{zIndex.veil}` are the only stacked layers.

## 6. Shapes

The geometry is machined restraint. Structural edges are square (`{rounded.none}`) — hairline rules, section bands, list dividers all run sharp. Exactly two rounded languages exist: the pill (`{rounded.pill}`) for the primary CTA and its nested icon disc, and the concentric Doppelrand pair (`{rounded.shell}` / `{rounded.core}`) for project cards. No mid-scale radii anywhere — a 6px-rounded rectangle is the template tell this system excludes.

Hairlines at `{borderWidths.hairline}` are the dominant drawn shape: they rule the nav, divide the experience list, underline the banner email link, and close the footer. The status dot is an 8px circle — the only free-floating circular element on the page.

## 7. Components

- **Navigation** (`{components.nav}`) — fixed, 72px, wordmark left ("Praneeth Reddy Mandalapu" in small serif), anchor links + theme control right in `{typography.meta-mono}`. Links hover from `{opacity.hover-dim}` to 1 over `{motion.duration-hover}`. Mobile: wordmark and theme control only.
- **Theme control** — a two-position text switch labelled "Onyx / Ivory" with a small gold indicator beside the active word (deliberately not a sun/moon toggle). Click triggers the signature veil transition. Keyboard-focusable, `aria-pressed`, 44px hit area.
- **Motion control** — a matching "Motion / Still" text switch beside the theme control governing the hero silk field. Same typography, same states, same hit area; persisted choice, `prefers-reduced-motion`-aware default.
- **Primary CTA** (`{components.button-primary}`) — Button-in-Button: cream/ink pill, label left, trailing arrow inside its own circular disc flush right. Hover translates the disc 4px right over `{motion.duration-hover}`; press scales the whole control to 0.98. One per section maximum.
- **Secondary CTA** — underlined inline link; the underline draws from left (`scaleX` 0→1, origin left) over `{motion.duration-underline}`.
- **Eyebrow tag** (`{components.eyebrow-tag}`) — bare mono uppercase in accent color, no pill background: quieter than the SaaS default, sits 28px above each section headline.
- **Experience row** (`{components.experience-row}`) — grid of [dates mono | role serif + org + one-line summary], hairline top border; hover raises the row's background one surface step and strengthens the hairline to `{opacity.hairline-strong}`.
- **Project card** (`{components.project-card-shell}` + `{components.project-card-core}`) — Doppelrand pair; award noted as plain mono text line (no badge pill). Hover lifts the core's inner highlight and dims siblings to `{opacity.hover-dim}`.
- **Status line** — breathing gold dot (`{motion.duration-pulse}` on `{motion.ease-perpetual}`) + current role in mono. The page's only perpetual motion.
- **Banner email link** — full-width serif email address at display-section scale with a drawing hairline underline; the contact section's CTA-shape variation.

All interactive elements: `touch-action: manipulation`, visible `:focus-visible` ring in the accent color, real `<a>`/`<button>` semantics.

## 8. Do's and Don'ts

**Do**

- Keep one gold accent instance per viewport region — signal, not decoration.
- Hold every transition to `{motion.ease-luxury}` at 600–1200ms; nothing on this page moves fast.
- Collapse every asymmetric layout to a single column below `{breakpoints.collapse}`.
- Use `100svh`/`100dvh` units only; `min-height`, never fixed `height`, for full-viewport sections.
- Keep the hero name to two lines at every viewport ≥768px; let it break naturally to three on phones.
- Serve both themes from CSS custom properties on `html[data-theme]`, with the choice persisted and applied before first paint (no flash).
- Respect `prefers-reduced-motion`: reveals become opacity-only, the status dot holds a static frame, the veil becomes an instant swap.
- List transition properties explicitly; animate `transform`, `opacity`, `clip-path` only.

**Don't**

- No photography, stock or otherwise, without duotone treatment toward the active foundation.
- No pure `#000`/`#FFF`, no cool grays, no gradients as surfaces, never purple–pink.
- No Title Case headings, no exclamation marks, no marketing vocabulary, no meta-labels ("Section 01").
- No third rounded language: square edges, the pill, and the Doppelrand pair are the complete set.
- No perpetual animations beyond the hero silk field and the status dot — and none below the hero fold. The silk field must always honor the Motion control and `prefers-reduced-motion`, pause off-screen and on hidden tabs, and render at reduced resolution.
- No `backdrop-filter` outside the fixed nav; no shadows in Ivory.
- No scroll hijacking, no pinned sections, no "scroll to explore" cues.
- No emojis as icons; inline SVG (Phosphor-style light strokes) only.
- No `window.addEventListener('scroll')` for reveals — IntersectionObserver or CSS scroll-driven animations only.
