# 13 — Print Mode

## Overview

The Derhami digital resume must export perfectly to PDF via browser print. The print output should be a clean, professional resume suitable for job applications.

---

## Print CSS Architecture

```css
/* src/styles/print.css */
@import "./styles/print.css"; /* Loaded in index.css */
```

### Page Setup

```css
@page {
  size: A4;
  margin: 20mm;
}

@page letter {
  size: Letter;
  margin: 0.75in;
}
```

---

## What Gets Hidden in Print

| Element | Selector | Reason |
|---------|----------|--------|
| Header/Nav | `header`, `nav` | Interactive, not needed in print |
| Theme toggle | `button[aria-label]` | Interactive |
| Language toggle | `button[aria-label]` | Interactive |
| Mobile menu | `.md:hidden` | Responsive, not needed |
| Scroll indicators | `.absolute.bottom-8` | Decorative |
| Decorative orbs | `#home .absolute` | Decorative |
| Hover effects | All `hover:` classes | Not applicable |
| Internal scrollbars | `::-webkit-scrollbar` | Not needed |

---

## What Gets Simplified in Print

### Colors
```css
@media print {
  * {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
}
```

### Typography
```css
@media print {
  h1 { font-size: 24pt; }
  h2 { font-size: 18pt; border-bottom: 1px solid #ccc; }
  h3 { font-size: 14pt; }
  p { margin-bottom: 0.5rem; }
}
```

### Layout
```css
@media print {
  .min-h-screen { min-height: auto; }
  .section-container { max-width: 100%; padding: 0; margin: 0; }
  .section-padding { padding: 1rem 0; }
  section { page-break-inside: avoid; }
}
```

### Links
```css
@media print {
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666;
  }
  a[href^="#"]::after,
  a[href^="javascript:"]::after {
    content: ""; /* Hide anchor links */
  }
}
```

### Animations
```css
@media print {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

---

## Page Break Rules

```css
/* Avoid breaking inside cards */
.card,
.timeline-item,
.experience-card {
  page-break-inside: avoid;
}

/* Force page break before major sections */
.page-break-before {
  page-break-before: always;
}

/* Force page break after major sections */
.page-break-after {
  page-break-after: always;
}
```

---

## Interactive Elements in Print

### Timeline (Experience Section)

In print, **all timeline items are expanded** (achievements visible):

```css
@media print {
  /* Show all achievements */
  .timeline-achievements {
    display: block !important;
    height: auto !important;
    opacity: 1 !important;
  }
}
```

### Portfolio Cards

In print, portfolio cards show full content without hover states:

```css
@media print {
  .portfolio-card {
    break-inside: avoid;
    border: 1px solid #ddd;
  }
  .portfolio-card .hover-effect {
    display: none;
  }
}
```

---

## RTL Print Support

When printing in Persian (RTL), the print CSS must respect direction:

```css
@media print and (dir: rtl) {
  body {
    direction: rtl;
    text-align: right;
  }
}
```

---

## Print Testing Checklist

- [ ] All content is visible (no clipped elements)
- [ ] No broken layouts
- [ ] No empty pages
- [ ] All links show URLs
- [ ] All images/gradients print correctly
- [ ] Timeline items are expanded
- [ ] Portfolio cards are complete
- [ ] Contact information is visible
- [ ] Footer is visible
- [ ] A4 size fits correctly
- [ ] Letter size fits correctly
- [ ] RTL version prints correctly

---

## Browser Print Tips

### Chrome/Edge
1. Press `Ctrl+P` (or `Cmd+P` on Mac)
2. Destination: "Save as PDF"
3. Layout: Portrait
4. Margins: Default
5. Check: "Background graphics"
6. Click "Save"

### Firefox
1. Press `Ctrl+P` (or `Cmd+P` on Mac)
2. Print to: "Microsoft Print to PDF"
3. Check: "Print backgrounds"
4. Click "Print"

### Safari
1. Press `Cmd+P`
2. PDF > "Save as PDF"
3. Check: "Print backgrounds"
4. Click "Save"

---

## File References

- `src/styles/print.css` — Main print stylesheet
- `src/index.css` — Imports print.css
- `src/components/sections/Experience.tsx` — Timeline print behavior
- `src/components/sections/Portfolio.tsx` — Card print behavior
