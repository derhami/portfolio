# 08 — RTL Guide

## Overview

Derhami fully supports **bidirectional layouts** (LTR for English, RTL for Persian). Every CSS property uses **logical properties** to ensure correct rendering in both directions.

---

## Core Principle: Logical Properties

**Never use physical properties.** Always use logical equivalents.

| Physical (WRONG) | Logical (CORRECT) |
|-------------------|-------------------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |
| `float: left` | `float: inline-start` |

---

## Tailwind CSS Logical Utilities

Tailwind CSS v3+ supports logical properties via plugins or direct classes:

```html
<!-- margin-inline-start -->
<div class="ms-4">...</div>        <!-- Tailwind v3+ -->
<div class="ms-auto">...</div>     <!-- Auto margin start -->

<!-- margin-inline-end -->
<div class="me-4">...</div>

<!-- padding-inline-start -->
<div class="ps-4">...</div>

<!-- padding-inline-end -->
<div class="pe-4">...</div>

<!-- border-inline-start -->
<div class="border-s-2">...</div>

<!-- border-inline-end -->
<div class="border-e-2">...</div>

<!-- text-align: start/end -->
<div class="text-start">...</div>
<div class="text-end">...</div>

<!-- inset-inline-start/end -->
<div class="start-0">...</div>
<div class="end-0">...</div>
```

---

## RTL Implementation

### HTML Direction

The `dir` attribute is set dynamically on `<html>`:

```tsx
// In I18nProvider
document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
document.documentElement.lang = locale;
```

### Font Switching

```css
/* English */
body {
  font-family: "Ubuntu Sans", system-ui, sans-serif;
}

/* Persian (applied via [dir="rtl"] or class) */
[dir="rtl"] body,
body.fa {
  font-family: "Vazirmatn", "IRANSans", "Tahoma", sans-serif;
}
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // No special RTL plugin needed — use logical utilities
  ],
}
```

---

## Component RTL Patterns

### Header Navigation

```tsx
// CORRECT: Logical properties
<nav className="flex items-center gap-1">
  {items.map(item => (
    <button className="px-3 py-2 text-sm">
      {item.label}
    </button>
  ))}
</nav>

// WRONG: Physical properties
<nav className="flex items-center gap-1 pl-3 pr-3">
```

### Card Layout

```tsx
// CORRECT
<CardHeader>
  <div className="flex items-start justify-between">
    <div>
      <span className="text-xs uppercase tracking-wider">{category}</span>
      <CardTitle className="mt-1">{title}</CardTitle>
    </div>
    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100" />
  </div>
</CardHeader>

// The flex layout automatically flips in RTL
```

### Timeline

```tsx
// CORRECT: Use ms/me for margin, ps/pe for padding
<div className="flex flex-col md:flex-row gap-8">
  <div className="flex-1 text-end md:text-end">
    {/* Content */}
  </div>
  <div className="flex-1 hidden md:block" />
</div>

// The timeline line uses inset-inline-start
<div className="absolute start-4 md:start-1/2 top-0 bottom-0 w-px bg-border" />
```

### Mobile Menu

```tsx
// CORRECT: No directional classes that break in RTL
<motion.nav className="section-container py-4 flex flex-col gap-1">
  {items.map(item => (
    <button className="px-3 py-2 text-sm text-start">
      {item.label}
    </button>
  ))}
</motion.nav>
```

---

## Common RTL Pitfalls

### 1. Transform Origin

```css
/* WRONG: Breaks in RTL */
transform-origin: left center;

/* CORRECT: Use logical or center */
transform-origin: center;
```

### 2. Absolute Positioning

```css
/* WRONG */
position: absolute;
left: 0;

/* CORRECT */
position: absolute;
inset-inline-start: 0;
```

### 3. Box Shadow Direction

```css
/* This is fine — shadows are symmetric */
box-shadow: 0 4px 6px rgb(0 0 0 / 0.1);
```

### 4. Gradient Direction

```css
/* WRONG: Direction is physical */
background: linear-gradient(to right, ...);

/* CORRECT: Use logical or symmetric */
background: linear-gradient(to right, ...); /* OK for decorative */
/* Or use bg-gradient-to-r which is fine for decorative gradients */
```

### 5. Scroll Direction

```css
/* WRONG */
overflow-x: scroll;
scroll-snap-type: x mandatory;

/* CORRECT: RTL scrolling is handled by the browser */
/* Just ensure content flows correctly */
```

---

## Testing RTL

### Browser DevTools

1. Open DevTools
2. Elements panel → `<html>` element
3. Toggle `dir="rtl"` attribute
4. Verify layout flips correctly

### Manual Checklist

- [ ] Navigation items appear in correct order
- [ ] Text alignment is correct (start = right in RTL)
- [ ] Margins and paddings flip correctly
- [ ] Timeline alternates sides correctly
- [ ] Mobile menu opens correctly
- [ ] Cards display correctly
- [ ] Icons don't break layout
- [ ] Scroll behavior is natural
- [ ] Print layout works in RTL

---

## File References

- `src/lib/i18n.tsx` — Direction switching logic
- `src/index.css` — Global RTL styles
- `src/components/layout/Header.tsx` — Navigation RTL
- `src/components/sections/Experience.tsx` — Timeline RTL
- `tailwind.config.js` — Font configuration
