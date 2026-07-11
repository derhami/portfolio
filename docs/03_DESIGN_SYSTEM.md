# 03 — Design System

## Color Tokens

### Light Mode
```css
--background:       0 0% 100%;       /* Pure white */
--foreground:       240 10% 3.9%;    /* Near black */
--card:             0 0% 100%;       /* White */
--card-foreground:  240 10% 3.9%;
--primary:          240 5.9% 10%;    /* Dark slate */
--primary-foreground: 0 0% 98%;
--secondary:        240 4.8% 95.9%;  /* Light gray */
--secondary-foreground: 240 5.9% 10%;
--muted:            240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--accent:           240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--destructive:      0 84.2% 60.2%;
--border:           240 5.9% 90%;
--input:            240 5.9% 90%;
--ring:             240 5.9% 10%;
--radius:           0.5rem;
```

### Dark Mode
```css
--background:       240 10% 3.9%;    /* Near black */
--foreground:       0 0% 98%;        /* Pure white */
--card:             240 10% 3.9%;
--card-foreground:  0 0% 98%;
--primary:          0 0% 98%;
--primary-foreground: 240 5.9% 10%;
--secondary:        240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;
--muted:            240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent:           240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--destructive:      0 62.8% 30.6%;
--border:           240 3.7% 15.9%;
--input:            240 3.7% 15.9%;
--ring:             240 4.9% 83.9%;
```

---

## Typography Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display` | 3.5rem (56px) | 700 | 1.1 | -0.02em | Hero headline |
| `h1` | 2.5rem (40px) | 700 | 1.2 | -0.01em | Section titles |
| `h2` | 2rem (32px) | 600 | 1.3 | -0.01em | Subsection titles |
| `h3` | 1.5rem (24px) | 600 | 1.4 | 0 | Card titles |
| `h4` | 1.25rem (20px) | 600 | 1.4 | 0 | Small headings |
| `body-lg` | 1.125rem (18px) | 400 | 1.6 | 0 | Lead paragraphs |
| `body` | 1rem (16px) | 400 | 1.6 | 0 | Default text |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | 0 | Captions, labels |
| `caption` | 0.75rem (12px) | 500 | 1.4 | 0.02em | Overlines, tags |

---

## Font Families

```js
fontFamily: {
  sans: ["Ubuntu Sans", "system-ui", "-apple-system", "sans-serif"],
  persian: ["Vazirmatn", "IRANSans", "Tahoma", "sans-serif"],
  mono: ["JetBrains Mono", "Fira Code", "monospace"],
}
```

### Font Loading Strategy

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Load Ubuntu Sans (400, 500, 600, 700) -->
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
  rel="stylesheet"
/>

<!-- Load Vazirmatn (400, 500, 600, 700) -->
<link
  href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `0.5` | 2px | Tight spacing |
| `1` | 4px | Icon gaps |
| `1.5` | 6px | Small gaps |
| `2` | 8px | Badge padding |
| `3` | 12px | Card padding (sm) |
| `4` | 16px | Default gaps |
| `5` | 20px | Card padding |
| `6` | 24px | Section gaps |
| `8` | 32px | Large gaps |
| `10` | 40px | Section padding (sm) |
| `12` | 48px | Section padding (md) |
| `16` | 64px | Section padding (lg) |
| `20` | 80px | Hero spacing |
| `24` | 96px | Maximum spacing |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Sharp edges |
| `sm` | 0.25rem (4px) | Badges, small elements |
| `md` | 0.375rem (6px) | Buttons, inputs |
| `lg` | 0.5rem (8px) | Cards, containers |
| `xl` | 0.75rem (12px) | Large cards |
| `2xl` | 1rem (16px) | Modals |
| `full` | 9999px | Pills, avatars |

---

## Shadow System

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `xs` | `0 1px 2px rgb(0 0 0 / 0.05)` | `0 1px 2px rgb(0 0 0 / 0.3)` |
| `sm` | `0 1px 3px rgb(0 0 0 / 0.1)` | `0 1px 3px rgb(0 0 0 / 0.4)` |
| `md` | `0 4px 6px rgb(0 0 0 / 0.1)` | `0 4px 6px rgb(0 0 0 / 0.4)` |
| `lg` | `0 10px 15px rgb(0 0 0 / 0.1)` | `0 10px 15px rgb(0 0 0 / 0.4)` |
| `xl` | `0 20px 25px rgb(0 0 0 / 0.1)` | `0 20px 25px rgb(0 0 0 / 0.4)` |

---

## Glass Morphism

```css
.glass {
  backdrop-filter: blur(24px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets, small laptops |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| `behind` | -1 | Decorative elements |
| `base` | 0 | Default |
| `raised` | 10 | Sticky elements |
| `dropdown` | 20 | Dropdowns |
| `sticky` | 30 | Sticky header |
| `overlay` | 40 | Overlays |
| `modal` | 50 | Modals |
| `popover` | 60 | Popovers |
| `tooltip` | 70 | Tooltips |
| `toast` | 80 | Toast notifications |

---

## Component Patterns

### Card
```
rounded-xl border bg-card p-6 shadow-sm
transition-all duration-200
hover:shadow-md hover:scale-[1.02]
```

### Badge
```
inline-flex items-center rounded-full
border px-2.5 py-0.5 text-xs font-semibold
```

### Section Container
```
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```

### Focus Ring
```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Gradient Text
```
bg-gradient-to-r from-foreground to-foreground/70
bg-clip-text text-transparent
```
