# 16 — Placeholder Assets

## Overview

Since real project screenshots and images are not available, Derhami uses a **gradient + icon placeholder system** that creates unique, visually appealing placeholders for each project.

---

## Placeholder Strategy

### Why Placeholders?

1. **No real screenshots** — Projects are fictional/representative
2. **Consistent visual language** — All placeholders follow the same pattern
3. **Unique identity** — Each project has a distinct color scheme
4. **Performance** — No image downloads, no layout shift
5. **Print-friendly** — Gradients print cleanly

### Placeholder Types

| Type | Usage | Implementation |
|------|-------|----------------|
| Gradient + Icon | Portfolio cards | CSS gradient + Lucide icon |
| Initials | Avatar/profile | SVG with initials |
| Pattern | Background decoration | CSS repeating pattern |
| Geometric | Section dividers | CSS shapes |

---

## Portfolio Card Placeholders

### Gradient + Icon System

Each project card has a unique gradient and icon:

```tsx
const PLACEHOLDERS = {
  "design-system-pro": {
    gradient: "from-violet-500 to-purple-600",
    icon: "Layers",
  },
  "finflow-dashboard": {
    gradient: "from-emerald-500 to-teal-600",
    icon: "BarChart3",
  },
  "healthconnect": {
    gradient: "from-rose-500 to-pink-600",
    icon: "Heart",
  },
  "ecommerce-platform": {
    gradient: "from-amber-500 to-orange-600",
    icon: "ShoppingBag",
  },
  "social-app": {
    gradient: "from-blue-500 to-cyan-600",
    icon: "Users",
  },
  "analytics-tool": {
    gradient: "from-indigo-500 to-blue-600",
    icon: "TrendingUp",
  },
};
```

### Placeholder Component

```tsx
interface ProjectPlaceholderProps {
  gradient: string;
  iconName: string;
}

function ProjectPlaceholder({ gradient, iconName }: ProjectPlaceholderProps) {
  const IconComponent = getIconByName(iconName);

  return (
    <div
      className={cn(
        "aspect-[16/10] rounded-lg overflow-hidden",
        "flex items-center justify-center",
        "bg-gradient-to-br",
        gradient
      )}
    >
      <IconComponent
        className="h-16 w-16 text-white/80"
        strokeWidth={1}
      />
    </div>
  );
}
```

### Icon Mapping

```tsx
import {
  Layers,
  BarChart3,
  Heart,
  ShoppingBag,
  Users,
  TrendingUp,
  Palette,
  Code,
  Smartphone,
  Globe,
  Lock,
  Zap,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layers,
  BarChart3,
  Heart,
  ShoppingBag,
  Users,
  TrendingUp,
  Palette,
  Code,
  Smartphone,
  Globe,
  Lock,
  Zap,
};

function getIconByName(name: string) {
  return ICON_MAP[name] || Layers;
}
```

---

## Gradient Palettes

### Primary Palette (Projects)

| Name | Start | End | Usage |
|------|-------|-----|-------|
| Violet | `#8b5cf6` | `#7c3aed` | Design System |
| Emerald | `#10b981` | `#059669` | FinTech |
| Rose | `#f43f5e` | `#e11d48` | Healthcare |
| Amber | `#f59e0b` | `#d97706` | E-Commerce |
| Blue | `#3b82f6` | `#2563eb` | Social |
| Indigo | `#6366f1` | `#4f46e5` | Analytics |

### Secondary Palette (Accents)

| Name | Start | End | Usage |
|------|-------|-----|-------|
| Cyan | `#06b6d4` | `#0891b2` | Accents |
| Lime | `#84cc16` | `#65a30d` | Success states |
| Fuchsia | `#d946ef` | `#c026d3` | Highlights |
| Sky | `#0ea5e9` | `#0284c7` | Links |

---

## Background Patterns

### Subtle Grid Pattern

```css
.pattern-grid {
  background-image:
    linear-gradient(hsl(var(--border)) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Dot Pattern

```css
.pattern-dots {
  background-image: radial-gradient(
    hsl(var(--muted-foreground) / 0.15) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}
```

### Diagonal Lines

```css
.pattern-diagonal {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    hsl(var(--border)) 10px,
    hsl(var(--border)) 11px
  );
}
```

---

## Avatar Placeholder

For profile/about section:

```tsx
function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-foreground to-foreground/70 flex items-center justify-center">
      <span className="text-2xl font-bold text-background">{initials}</span>
    </div>
  );
}
```

---

## Section Divider Placeholders

### Gradient Line

```tsx
function GradientDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}
```

### Decorative Orb

```tsx
function DecorativeOrb({ position }: { position: "left" | "right" }) {
  return (
    <div
      className={cn(
        "absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl",
        position === "left" ? "top-1/4 start-1/4" : "bottom-1/4 end-1/4"
      )}
    />
  );
}
```

---

## Icon Inventory

### Used Icons (Lucide)

| Icon | Usage |
|------|-------|
| `ArrowDown` | Scroll indicator, CTA |
| `Mail` | Contact CTA |
| `ExternalLink` | Project links |
| `Sun` | Light mode toggle |
| `Moon` | Dark mode toggle |
| `Globe` | Language toggle |
| `Menu` | Mobile menu |
| `X` | Close menu |
| `CheckCircle` | About highlights |
| `Briefcase` | Experience |
| `Calendar` | Experience dates |
| `ChevronDown` | Timeline expand |
| `Layers` | Design System placeholder |
| `BarChart3` | FinTech placeholder |
| `Heart` | Healthcare placeholder |
| `ShoppingBag` | E-Commerce placeholder |
| `Users` | Social placeholder |
| `TrendingUp` | Analytics placeholder |

### Available Icons (Not Yet Used)

| Icon | Potential Usage |
|------|-----------------|
| `Code` | Technical skills |
| `Palette` | Design skills |
| `Smartphone` | Mobile projects |
| `Globe` | Web projects |
| `Lock` | Security features |
| `Zap` | Performance |
| `Sparkles` | Premium features |
| `Award` | Achievements |
| `GraduationCap` | Education |
| `FileText` | Resume |

---

## File References

- `src/components/sections/Portfolio.tsx` — Uses placeholders
- `src/components/sections/Hero.tsx` — Decorative orbs
- `src/components/sections/About.tsx` — Avatar placeholder
- `src/content/en.ts` — Project gradient/icon data
- `src/content/fa.ts` — Project gradient/icon data
- `src/types/content.ts` — Placeholder type definitions
