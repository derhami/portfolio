# 01 — Master Prompt

## Project Identity

**Derhami** is a premium interactive digital experience for a professional UI/UX Designer. It is NOT a traditional resume. It is a product-quality single-page storytelling experience that showcases design expertise through its own implementation.

**Domain:** hawid.ir

---

## Architecture Decision: Single-Page Storytelling

The entire experience is a **single continuous scroll** with narrative flow. There are NO separate pages, NO sidebar navigation, NO multi-page routing.

### Page Structure (Top to Bottom)

```
1. Hero          — Full-screen cinematic opening
2. About         — Personal narrative with bio
3. Experience    — Interactive timeline (internal scroll)
4. Skills        — Categorized expertise grid
5. Portfolio     — Rich case study cards (internal scroll)
6. Resume        — Printable resume section (internal scroll)
7. Contact       — Final CTA and social links
```

### Internal Scrolling Rules

- **Portfolio section**: Contains its own scrollable container for case study cards when content overflows
- **Resume section**: Contains its own scrollable container for detailed resume content when content overflows
- **All other sections**: Standard page scroll, no internal scrolling
- Internal scroll containers use `overflow-y: auto` with custom scrollbar styling
- Internal scroll containers have a fixed max-height relative to viewport

---

## Removed Elements

The following elements are **explicitly removed** from this project:

| Element | Reason |
|---------|--------|
| Sidebar layout | Replaced with top navigation bar |
| Multi-page navigation | Replaced with single-page smooth scroll |
| Progress bars | Replaced with skill badges (no arbitrary proficiency levels) |
| Static timeline | Replaced with interactive expandable timeline |

---

## Typography System

| Role | Font | Fallback |
|------|------|----------|
| English Headings | Ubuntu Sans | system-ui, sans-serif |
| English Body | Ubuntu Sans | system-ui, sans-serif |
| Persian Headings | Vazirmatn | IRANSans, Tahoma, sans-serif |
| Persian Body | Vazirmatn | IRANSans, Tahoma, sans-serif |
| Monospace | JetBrains Mono | Fira Code, monospace |

### Why These Fonts

- **Ubuntu Sans**: Humanist sans-serif with excellent readability, modern feel, and wide language support
- **Vazirmatn**: Best-in-class Persian/Arabic font with proper kerning, ligatures, and RTL support
- Both fonts are variable-weight, enabling fine-tuned typography

---

## Bilingual System

- **English (en)**: LTR layout, Ubuntu Sans
- **Persian (fa)**: RTL layout, Vazirmatn
- Automatic detection via `navigator.language`
- Manual toggle via language switcher
- Persisted in `localStorage`
- All CSS uses **logical properties** (margin-inline-start, padding-inline-end, etc.)

---

## Animation Philosophy

**Framer-style motion**: Every animation serves a narrative purpose.

- Entrance animations: opacity + translateY (scroll-triggered)
- Hover states: scale + shadow (micro-interaction)
- Timeline: expand/collapse with spring physics
- Portfolio cards: staggered entrance with parallax hint
- All respect `prefers-reduced-motion: reduce`

---

## Design Principles

1. **Narrative Flow** — Each section tells part of the story
2. **Progressive Disclosure** — Details reveal on interaction
3. **Logical Properties** — Everything works in LTR and RTL
4. **Print Parity** — Print output matches screen quality
5. **Performance Budget** — 95+ Lighthouse, <200KB JS gzipped

---

## Content Strategy

- No hardcoded strings — all content in `src/content/en.ts` and `src/content/fa.ts`
- No placeholder text — every word is intentional
- Portfolio items include: title, category, description, tags, color scheme, placeholder visual
- Experience items include: role, company, period, description, achievements (expandable)

---

## Quality Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Bundle Size (JS gzipped) | <200KB |
| Bundle Size (CSS gzipped) | <15KB |
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
