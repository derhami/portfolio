# 06 — Components

## Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx        — Fixed top navigation bar
│   │   └── Footer.tsx        — Site footer
│   ├── sections/
│   │   ├── Hero.tsx          — Full-screen cinematic opening
│   │   ├── About.tsx         — Personal narrative
│   │   ├── Experience.tsx    — Interactive timeline
│   │   ├── Skills.tsx        — Expertise grid
│   │   ├── Portfolio.tsx     — Rich case study cards (internal scroll)
│   │   ├── Resume.tsx        — Printable resume (internal scroll)
│   │   └── Contact.tsx       — CTA and social links
│   └── ui/
│       ├── button.tsx        — Button primitive
│       ├── badge.tsx         — Badge primitive
│       ├── card.tsx          — Card primitive
│       ├── separator.tsx     — Separator primitive
│       └── scroll-area.tsx   — Custom scrollbar for internal scroll
```

---

## Removed Components

| Component | Was | Replaced By |
|-----------|-----|-------------|
| Sidebar | Mobile slide-out menu | Simplified mobile header menu |
| ProgressBar | Skill proficiency bars | Skill badges (no arbitrary levels) |
| StaticTimeline | Fixed alternating timeline | Interactive expandable timeline |

---

## Layout Components

### Header

**Behavior:**
- Fixed to top, full width
- Glass morphism on scroll (backdrop-blur)
- Logo/brand on start
- Navigation links in center (desktop) / hamburger menu (mobile)
- Theme toggle + language toggle on end
- Active section highlighted via Intersection Observer

**Mobile:**
- Hamburger menu opens inline dropdown (NOT a sidebar)
- Menu items stacked vertically
- Same glass morphism styling

**Removed:**
- ~~Mobile sidebar slide-out~~ → Inline dropdown menu
- ~~Multi-page navigation~~ → Single-page smooth scroll

### Footer

**Behavior:**
- Simple centered footer
- Copyright text
- "Made with" tagline
- Border top separator

---

## Section Components

### Hero

**Behavior:**
- Full viewport height (`min-h-screen`)
- Centered content with gradient background
- Decorative blurred orbs (absolute positioned)
- Animated entrance (staggered opacity + translateY)
- Two CTAs: primary (scroll to portfolio) and secondary (scroll to contact)
- Animated scroll-down indicator

**Removed:**
- ~~Nothing~~ — This section is clean

### About

**Behavior:**
- Two-column layout on desktop (text + highlights)
- Bio paragraphs with staggered entrance
- Skill highlights as badges (NOT progress bars)
- Scroll-triggered animation

**Removed:**
- ~~Progress bars for skill levels~~ → Simple badge list

### Experience (Interactive Timeline)

**Behavior:**
- Vertical timeline with connected line
- Alternating cards (left/right on desktop)
- Each card is **expandable** — click to reveal achievements
- Expand/collapse with spring animation
- Active item highlighted
- Scroll-triggered entrance with stagger

**Interactive Features:**
- Click card header to expand/collapse achievements
- Smooth height animation (Framer Motion `AnimatePresence`)
- Chevron icon rotates on expand
- Only one item expanded at a time (accordion behavior)

**Removed:**
- ~~Static non-interactive timeline~~ → Interactive expandable timeline
- ~~Achievements always visible~~ → Progressive disclosure on click

### Skills

**Behavior:**
- Three-column grid (Design, Technical, Soft Skills)
- Each category is a card with badge list
- Badges animate in with stagger
- No progress bars, no proficiency levels
- Purely categorical display

**Removed:**
- ~~Progress bars / proficiency indicators~~ → Simple badge list

### Portfolio (Internal Scroll)

**Behavior:**
- Section title + description
- **Internally scrollable container** for project cards
- Rich project cards with:
  - Color gradient placeholder (unique per project)
  - Project icon/illustration placeholder
  - Title, category, description
  - Technology tags
  - "View Case Study" link
- Cards stagger-animate on scroll
- Internal scroll has custom scrollbar styling

**Internal Scroll Rules:**
- `max-height: 60vh` (or similar)
- `overflow-y: auto`
- Custom `::-webkit-scrollbar` styling
- Smooth scroll behavior
- Scroll indicator (faded edge) when content overflows

**Rich Card Structure:**
```
┌─────────────────────────────┐
│  [Gradient Placeholder]     │  ← Color gradient unique per project
│  [Icon/Illustration]        │  ← Lucide icon or SVG illustration
├─────────────────────────────┤
│  Category Overline          │  ← Small uppercase text
│  Project Title              │  ← Bold heading
│  Description text...        │  ← Muted body text
│  [Tag] [Tag] [Tag]          │  ← Technology badges
│  → View Case Study          │  ← Link with arrow
└─────────────────────────────┘
```

### Resume (Internal Scroll)

**Behavior:**
- Printable resume layout
- **Internally scrollable container** for detailed content
- Structured sections: Experience, Education, Certifications
- Clean, print-optimized typography
- Logical properties for RTL support

### Contact

**Behavior:**
- Centered CTA section
- Email button (mailto link)
- Social links row (LinkedIn, Dribbble, GitHub)
- Scroll-triggered animation

---

## UI Primitives

### Button
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Supports `asChild` via Radix Slot
- Focus ring for accessibility

### Badge
- Variants: default, secondary, destructive, outline
- Used for: skill tags, project tags, category labels
- Rounded-full pill shape

### Card
- Composable: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Border + shadow + rounded corners
- Hover state with scale + shadow

### Separator
- Horizontal or vertical
- Uses Radix Separator primitive
- Purely decorative by default

### ScrollArea
- Custom scrollbar for internal scroll containers
- Thin, rounded scrollbar thumb
- Hover state reveals full scrollbar
- RTL-aware

---

## Component Rules

1. **No inline styles** — Everything via Tailwind classes
2. **No hardcoded strings** — All text from i18n content
3. **No duplicated code** — Shared utilities in `lib/utils.ts`
4. **Everything typed** — Props interfaces for all components
5. **Everything accessible** — ARIA labels, focus management, keyboard navigation
6. **Everything responsive** — Mobile-first, breakpoints at sm/md/lg
7. **Everything animated** — Framer Motion for all state changes
8. **Everything RTL-ready** — Logical properties only
