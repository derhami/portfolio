# 06 — Components

## Component Architecture

```
src/
├── components/
│   ├── sections/
│   │   ├── CapsuleMenu.tsx     — Fixed bottom capsule navigation bar
│   │   ├── Hero.tsx            — Full-screen intro with portrait, stats, CTAs
│   │   ├── About.tsx           — Bio paragraphs
│   │   ├── Work.tsx            — Portfolio slider with swipe + dot navigation
│   │   ├── Experience.tsx      — Stacked sticky timeline cards
│   │   ├── Skills.tsx          — Tabbed skill grid with SVG brand icons
│   │   ├── Contact.tsx         — Contact info and social links
│   │   └── Assistant.tsx       — Floating chat assistant popup
│   └── ui/
│       ├── FadeIn.tsx          — Scroll-triggered animation wrapper (Framer Motion)
│       ├── Image.tsx           — Image component with error fallback
│       └── ProjectModal.tsx    — Full-screen project detail modal with gallery
```

---

## Removed Components

| Component | Was | Replaced By |
|-----------|-----|-------------|
| Header | Fixed top navigation | CapsuleMenu (bottom capsule bar) |
| Footer | Site footer | Removed entirely |
| Sidebar | Mobile slide-out menu | CapsuleMenu (always visible) |
| ProgressBar | Skill proficiency bars | Skill badges (no arbitrary levels) |
| button/badge/card | shadcn/ui primitives | Tailwind utility classes (no library) |

---

## Navigation: CapsuleMenu

**Behavior:**
- Fixed bottom center, pill-shaped capsule bar
- Section links: Work, Experience, Skills, Contact
- Theme toggle (Sun/Moon) + Language toggle (EN/FA)
- Active section highlighted via scroll listener
- Glass morphism (backdrop-blur) + shadow

**Mobile Improvements (Phase 12):**
- Print button removed
- Larger touch targets: `px-4 py-2.5` on links, `w-9 h-9` on icon buttons
- Increased gap between items for better tap accuracy

---

## Section Components

### Hero

**Behavior:**
- Full viewport height (`min-h-screen`)
- Dot grid background pattern
- Portrait image with ring border
- Animated entrance (staggered via FadeIn)
- Two CTAs: primary (scroll to work) + secondary (email)
- Stats row with tabular numbers

### About

**Behavior:**
- Bio paragraphs with staggered scroll-triggered animation
- Section divider (hidden on mobile)
- Section title uses `.section-title` class for sticky behavior on mobile

### Work (Portfolio Slider)

**Behavior:**
- Single-project-at-a-time slider
- Project image with hover overlay (click opens ProjectModal)
- Client name, period, role, description
- External link button (if project has URL)
- Dot indicators for project count

**Navigation (Phase 12):**
- Arrows flank the counter: `← [01/05] →`
- Separator line between arrows and dot indicators
- Touch swipe support on the project card (left/right)

**Touch Swipe:**
- `onTouchStart`, `onTouchMove`, `onTouchEnd` handlers
- 50px threshold for swipe detection
- RTL-aware direction handling

### Experience

**Behavior:**
- Stacked sticky cards (each card sticks at offset from top)
- Briefcase, Clock, MapPin icons
- Company, role, period, location, description
- Client tags and skill tags
- Section title uses `.section-title` for sticky behavior

### Skills

**Behavior:**
- Tabbed interface (one active group at a time)
- Custom SVG brand logos (Figma, Framer, React, TailwindCSS, etc.)
- Skills grid with hover effects
- Section title uses `.section-title` for sticky behavior

### Contact

**Behavior:**
- Headline, email, phone, website links
- Social link buttons (pill-shaped)
- Section divider at top (absolute positioned)
- Section title uses `.section-title` for sticky behavior

### Assistant (Chat Popup)

**Behavior:**
- Floating action button (bottom-right, fixed)
- Terminal-style chat panel with backdrop blur
- Predefined Q&A with fuzzy search (Levenshtein distance)
- Chat history with user/system/answer roles
- Email compose via mailto link

**Mobile Improvements (Phase 12):**
- FAB positioned at `bottom-[84px]` to avoid capsule menu overlap
- Chat panel has `mb-[76px]` bottom margin on mobile
- Max height: `calc(100dvh - 100px)` for proper viewport fit

---

## UI Primitives

### FadeIn

- Scroll-triggered animation wrapper using Framer Motion `useInView`
- Props: `delay`, `y` (translateY offset)
- Default: opacity 0→1 + translateY 16→0

### Image

- Wraps `<img>` with error fallback
- On error: shows fallback text (initials or name) instead of broken image
- Uses `onError` event to toggle fallback state

### ProjectModal

- Full-screen modal with backdrop blur
- Image gallery with prev/next navigation + dot indicators
- Thumbnail overlay navigation bar
- Project details: header, description, highlights grid
- External link button
- Keyboard support: Escape (close), ArrowLeft/ArrowRight (gallery)
- **Touch swipe** on gallery images (Phase 12)
- Body scroll lock when open

---

## CSS Classes

### `.section-title`
- Added to section title `<p>` elements
- On mobile: `position: sticky; top: 0; z-index: 10`
- Background matches `--bg` to mask content scrolling behind
- Ensures section context is always visible

### `.section-divider`
- Horizontal gradient line (transparent edges, border color center)
- `opacity: 0.6`
- **Hidden on mobile** (`display: none` at `max-width: 768px`)

### `.section-snap`
- Used on section wrapper `<div>` in App.tsx
- Mobile: `scroll-snap-align: start; min-height: 100vh; height: 100%`
- Flex column with centered content

### `.focus-ring`
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand`
- Applied to all interactive elements

---

## Component Rules

1. **No inline styles** — Everything via Tailwind classes or CSS custom properties
2. **No hardcoded strings** — All text from i18n content (en.ts / fa.ts)
3. **Everything typed** — Props interfaces for all components
4. **Everything accessible** — ARIA labels, focus management, keyboard navigation
5. **Everything responsive** — Mobile-first, breakpoints at sm/md/lg
6. **Everything animated** — Framer Motion via FadeIn wrapper
7. **Everything RTL-ready** — Logical properties, direction-aware icons
8. **Touch support** — Swipe handlers on carousels/gallery for mobile
9. **Content source of truth** — Content is NEVER modified; schema adapts to content
