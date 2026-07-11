# 10 — Animation Rules

## Philosophy

**Framer-style motion**: Every animation serves a narrative purpose. Motion guides attention, reveals content progressively, and creates delight — never distracts.

---

## Animation Categories

### 1. Entrance Animations (Scroll-Triggered)

**When:** Elements enter viewport for the first time
**Trigger:** Intersection Observer (`useInView` hook)
**Properties:** opacity + translateY

```tsx
// Standard entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

**Variations:**
- `y: 20` → Standard slide up
- `y: 30` → Heavy slide up (for large elements)
- `y: 10` → Subtle slide up (for small elements)
- `x: -10` → Slide from left (for list items)
- `x: 10` → Slide from right (for list items in RTL)

### 2. Stagger Animations

**When:** Multiple related items appear together
**Implementation:** Incremental delay per item

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: 0.5,
      delay: 0.1 + index * 0.05, // 50ms stagger
    }}
  >
    {item.content}
  </motion.div>
))}
```

**Stagger Rates:**
- `50ms` — Fast (badges, tags)
- `80ms` — Medium (list items, cards)
- `100ms` — Slow (section elements)

### 3. Hover Micro-Interactions

**When:** User hovers over interactive elements
**Properties:** scale + shadow + color

```tsx
// Card hover
<motion.div
  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgb(0 0 0 / 0.1)" }}
  transition={{ duration: 0.2 }}
>
  {card}
</motion.div>

// Button hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  {button}
</motion.button>
```

**Scale Values:**
- `1.02` — Subtle (cards, containers)
- `1.05` — Noticeable (buttons, links)
- `0.98` — Tap反馈 (buttons on press)

### 4. Expand/Collapse (Timeline)

**When:** User clicks to expand timeline item
**Implementation:** AnimatePresence + height animation

```tsx
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      {expandableContent}
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Page Load Animation

**When:** Initial page load
**Implementation:** Staggered entrance of hero elements

```tsx
// Hero entrance sequence
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  Headline
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  Subheadline
</motion.p>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  CTAs
</motion.div>
```

### 6. Floating Animation (Loop)

**When:** Decorative elements (scroll indicator)
**Implementation:** Infinite y-axis oscillation

```tsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <ArrowDown />
</motion.div>
```

---

## Easing Curves

| Name | Value | Usage |
|------|-------|-------|
| Standard | `[0.4, 0, 0.2, 1]` | Default for most animations |
| Decelerate | `[0, 0, 0.2, 1]` | Entrance animations |
| Accelerate | `[0.4, 0, 1, 1]` | Exit animations |
| Spring | `{ type: "spring", stiffness: 300, damping: 30 }` | Expand/collapse |

---

## Duration Scale

| Name | Duration | Usage |
|------|----------|-------|
| Instant | 100ms | Micro-interactions (color, opacity) |
| Fast | 200ms | Hover states, focus rings |
| Normal | 300ms | Small element transitions |
| Slow | 500ms | Section entrances, page transitions |
| Slower | 700ms | Large hero animations |

---

## Reduced Motion

**Always respect `prefers-reduced-motion: reduce`**

```css
/* In index.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// In components — check before animating
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").skills;

<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
  animate={prefersReduced ? false : { opacity: 1, y: 0 }}
>
```

---

## Performance Rules

1. **Only animate transform and opacity** — Never animate layout properties (width, height, margin)
2. **Use `will-change` sparingly** — Only for elements that animate frequently
3. **Batch animations** — Use stagger for lists, not individual delays
4. **Avoid animating large areas** — Keep animations focused on small elements
5. **Use CSS animations for simple cases** — Framer Motion for complex choreography

---

## Forbidden Patterns

| Pattern | Why |
|---------|-----|
| Animating `width`/`height` | Triggers layout reflow |
| Animating `top`/`left` | Triggers layout reflow |
| Animating `margin`/`padding` | Triggers layout reflow |
| Multiple simultaneous animations on same element | Confusing, hard to debug |
| Animations longer than 700ms | Feels sluggish |
| Animations on scroll (parallax) | Performance killer |
| Auto-playing videos/animations | Distracting, accessibility issue |

---

## File References

- `src/hooks/useInView.ts` — Scroll-triggered animation hook
- `src/components/sections/Hero.tsx` — Page load animation
- `src/components/sections/Experience.tsx` — Expand/collapse animation
- `src/components/sections/Portfolio.tsx` — Stagger animation
- `src/index.css` — Reduced motion styles
