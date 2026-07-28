# HAWID Portfolio — Design System

## Theme Variables

All colors are defined as CSS custom properties on `:root` (light) and `.dark` (dark).

### Backgrounds
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg` | `#F8F9FA` | `#07080F` | Page background |
| `--bg-elevated` | `#F2F3F5` | `#0C0D16` | Elevated surfaces |

### Foregrounds
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--fg-title` | `#0F1014` | `#F4F4F8` | Section titles, headings |
| `--fg-body` | `#3E3F48` | `#B0B1BA` | Body text |
| `--fg-subtle` | `#686A74` | `#7E7F89` | Secondary text, roles |
| `--fg-faint` | `#94959E` | `#55565F` | Muted text, metadata |

### Borders
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--border` | `#E2E3E8` | `#1A1B24` | Section borders, card borders |
| `--border-subtle` | `#EBECF0` | `#13141C` | Subtle dividers |

### Surfaces
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--surface` | `#EFF0F3` | `#0E0F18` | Tag backgrounds, small surfaces |
| `--surface-hover` | `#E7E8EC` | `#15161F` | Hover state for surfaces |

### Brand
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--brand` | `#1A4AFF` | `#3B6BF7` | Primary CTAs, accent, active indicators |
| `--brand-hover` | — | — | Use `opacity-80` or darken by 10% |

### Cards
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--card-bg` | `#F2F3F6` | `#0C0D15` | Card backgrounds |
| `--card-bg-solid` | `#EBECF0` | `#10111A` | Solid card surfaces |

### Capsule
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--capsule-bg` | `#EBECF0` | `#10111A` | Navigation capsule background |
| `--capsule-border` | `#DCDDE2` | `#1C1D26` | Capsule border |

---

## Typography

### Fonts
- **English:** Ubuntu (300, 400, 500, 700 + 400i, 700i)
- **Farsi:** IRANYekanXVF (variable, 100–900)
- **Decorative:** Rooyin (display only)

### Type Scale
Base size: 16px

| Level | Class | Size | Weight | Usage |
|-------|-------|------|--------|-------|
| Hero title | `text-5xl md:text-7xl` | 48–72px | 700 | Hero name |
| Section title | `text-sm sm:text-base uppercase` | 14–16px | 600 | `SectionTitle` component |
| Headline | `text-3xl sm:text-4xl lg:text-6xl` | 30–60px | 700 | Contact headline |
| Subtitle | `text-lg sm:text-xl md:text-2xl` | 18–24px | 600 | Section subtitle |
| Body | `text-sm sm:text-base` | 14–16px | 400 | Paragraphs |
| Body small | `text-xs sm:text-sm` | 12–14px | 400 | Descriptions |
| Meta | `text-[0.6rem] sm:text-[0.65rem]` | ~9–10px | 500 | Dates, metadata |
| Tiny | `text-[0.55rem]` | ~8px | 600 | Badges, labels |

### Line Heights
- Headings: `leading-[1.1]`
- Body: `leading-[1.8]`
- Card body: `leading-[1.7]`

### Letter Spacing
- English headings: `tracking-tight` or `-0.02em`
- Farsi: no letter spacing (`tracking-normal`)
- Section titles: `tracking-[0.15em]` uppercase
- Badges/labels: `tracking-widest`

---

## Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `py-16 sm:py-24` (64–96px) | Top/bottom section spacing |
| Section gap (content) | `gap-12 lg:gap-16` (48–64px) | Between content columns |
| Card padding | `p-5 sm:p-6` (20–24px) | Inside cards |
| Card gap | `space-y-4` / `gap-3` (12–16px) | Between card elements |
| Tag padding | `px-2 py-0.5` (8×2px) | Skills tags |
| Nav item padding | `px-2.5 sm:px-3.5 py-1.5 sm:py-2` | Capsule items |
| Timeline gap | `space-y-6 md:space-y-8` (24–32px) | Between experience entries |
| Description indent | `pl-6` (24px) | Icon alignment in experience |

Max content width: `max-w-2xl` (~672px), Contact: `max-w-[1100px]`

---

## Components

### FadeIn
Wrapper component for staggered entrance animations.

```tsx
<FadeIn variant="fadeUp" delay={0.1} duration={0.5}>
  {children}
</FadeIn>
```

**Variants:**
| Variant | Initial | Animate |
|---------|---------|---------|
| `fadeUp` | opacity 0, y: 20 | opacity 1, y: 0 |
| `fadeIn` | opacity 0 | opacity 1 |
| `scaleIn` | opacity 0, scale: 0.92 | opacity 1, scale: 1 |
| `blurIn` | opacity 0, y: 8 | opacity 1, y: 0 |
| `slideUp` | opacity 0, y: 40 | opacity 1, y: 0 |

Default ease: `[0.22, 0.03, 0.26, 1]`

Standard stagger pattern: `delay={i * 0.1}` (100ms between items).

### SectionTitle
Numbered section header with gradient line.

```tsx
<SectionTitle id="about">About</SectionTitle>
```

Index map: about=01, experience=02, work=03, contact=04.

### Image
Image component with shimmer loading and error fallback.

```tsx
<Image src="/path/to/image.webp" alt="Description" fallback="Placeholder" />
```

---

## Layout Patterns

### Section Structure
```tsx
<section id="section-name" className="py-16 sm:py-24 relative">
  <FadeIn variant="fadeIn" duration={0.4}>
    <SectionTitle id="section-name">Title</SectionTitle>
  </FadeIn>
  {/* Content */}
</section>
```

### Two-Column Layout
```tsx
<div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
  <div className="flex-1 min-w-0">{/* content */}</div>
  <div className="hidden lg:block w-[340px] xl:w-[400px] shrink-0">{/* visual */}</div>
</div>
```

### Grid Patterns
- **2×2 values:** `grid grid-cols-2 gap-3`
- **2×3 expertise:** `grid grid-cols-2 sm:grid-cols-3 gap-2.5`
- **5-col brands:** `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4`

---

## Animation Rules

1. Every section title uses `FadeIn variant="fadeIn" duration={0.4}` with no delay.
2. Content items use 100ms stagger: `delay={i * 0.1}`.
3. Default content animation: `variant="slideUp" duration={0.5}`.
4. Subtle items (paragraphs): `variant="blurIn" duration={0.5}`.
5. Ease curve is always `[0.22, 0.03, 0.26, 1]` (custom ease-out).
6. Parallax uses `useScroll` + `useTransform` with `["start end", "end start"]` offsets.
7. Social icons: `transitionDuration: "180ms"`, scale 1.1 on hover.
8. Buttons: `transition-all duration-200`.

---

## Capsule Navigation

Fixed at `bottom-10`, centered with `left-1/2 -translate-x-1/2`. Items:
- Home → #hero
- About → #about
- Experience → #experience
- Selected Work → #work
- Contact → #contact

Active detection: first section whose top is within `window.innerHeight / 3` of viewport top.

---

## Design Principles

1. **Restraint.** No unnecessary elements. Every component must justify its existence.
2. **Consistency.** Use the same spacing, color, and typography tokens across all sections.
3. **Hierarchy.** Hero → About → Experience → Work → Contact. Projects are the strongest section.
4. **Motion.** Subtle, purposeful animations. No decorative motion without meaning.
5. **Dark mode.** All colors have explicit light and dark variants. No hardcoded colors.
6. **Bilingual.** All content has EN and FA variants. Farsi uses IRANYekanX with `dir="rtl"`.
