# Praneeth Reddy Mandalapu — Portfolio

Single-page portfolio in the Corporate Luxury register, with two switchable
expressions of one identity: **Onyx** (dark, champagne-gold accents) and
**Ivory** (warm cream, bronze accents). Design tokens and rationale live in
[DESIGN.md](DESIGN.md) — consult it before any visual change.

## Stack

- Next.js 16 (App Router, static prerender)
- Tailwind CSS 4 + hand-written token CSS in `app/globals.css`
- Bodoni Moda / Hanken Grotesk / IBM Plex Mono via `next/font`

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static production build
```

## Content

All résumé content lives in [lib/resume.ts](lib/resume.ts) — edit roles,
projects, honors, and contact details there. The downloadable PDF is
`public/Praneeth-Reddy-Mandalapu-Resume.pdf`; replace it when the résumé
changes.
