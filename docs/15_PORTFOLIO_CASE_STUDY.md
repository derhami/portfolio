# 15 — Portfolio Case Study

## Overview

The Portfolio section is the centerpiece of the Derhami digital resume. It showcases projects through rich, interactive cards with unique visual identities.

---

## Card Architecture

Each portfolio card follows a consistent structure with unique visual treatment:

```
┌──────────────────────────────────────┐
│                                      │
│  ┌────────────────────────────────┐  │
│  │                                │  │
│  │    [Gradient Placeholder]      │  │  ← Unique color scheme per project
│  │    [Icon / Illustration]       │  │  ← Lucide icon or SVG
│  │                                │  │
│  └────────────────────────────────┘  │
│                                      │
│  CATEGORY OVERLINE                   │  ← Small uppercase text
│  Project Title                      │  ← Bold heading
│                                      │
│  Description text that explains     │  ← Muted body text (2-3 lines)
│  what this project is about and     │
│  what was accomplished.             │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ Tag1 │ │ Tag2 │ │ Tag3 │        │  ← Technology badges
│  └──────┘ └──────┘ └──────┘        │
│                                      │
│  → View Case Study                   │  ← Link with arrow icon
│                                      │
└──────────────────────────────────────┘
```

---

## Placeholder System

Since real project screenshots are not available, each card uses a **gradient + icon placeholder** that creates a unique visual identity.

### Color Schemes

Each project gets a unique gradient:

| Project | Gradient | Icon |
|---------|----------|------|
| Design System Pro | `from-violet-500 to-purple-600` | Layers |
| FinFlow Dashboard | `from-emerald-500 to-teal-600` | BarChart3 |
| HealthConnect | `from-rose-500 to-pink-600` | Heart |
| E-Commerce Platform | `from-amber-500 to-orange-600` | ShoppingBag |
| Social App | `from-blue-500 to-cyan-600` | Users |
| Analytics Tool | `from-indigo-500 to-blue-600` | TrendingUp |

### Placeholder Component

```tsx
function ProjectPlaceholder({ gradient, icon: Icon }: Props) {
  return (
    <div className={cn(
      "aspect-[16/10] rounded-lg flex items-center justify-center",
      "bg-gradient-to-br",
      gradient
    )}>
      <Icon className="h-12 w-12 text-white/80" strokeWidth={1.5} />
    </div>
  );
}
```

---

## Card Data Structure

```typescript
interface Project {
  title: string;
  titleFa: string;
  category: string;
  categoryFa: string;
  description: string;
  descriptionFa: string;
  tags: string[];
  gradient: string;        // Tailwind gradient class
  icon: string;            // Lucide icon name
  year: string;
  role: string;
  roleFa: string;
  duration: string;
  durationFa: string;
}
```

---

## Card Interactions

### Hover State
- Card scales up slightly (`scale: 1.02`)
- Shadow deepens
- Gradient placeholder gets subtle overlay
- "View Case Study" link becomes more prominent

### Focus State
- Focus ring visible for keyboard navigation
- Same visual treatment as hover

### Click Behavior
- Links to external case study (or internal modal in future)
- Opens in new tab with `rel="noopener noreferrer"`

---

## Internal Scroll Container

The Portfolio section uses an **internal scroll container** when there are many projects:

```tsx
<section id="portfolio" className="section-padding">
  <div className="section-container">
    <h2>{content.portfolio.title}</h2>
    <p>{content.portfolio.subtitle}</p>

    {/* Internal scroll container */}
    <div className="mt-8 max-h-[60vh] overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
        {projects.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  </div>
</section>
```

### Scroll Container Styling

```css
/* Custom scrollbar */
.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
```

### Scroll Indicator

When content overflows, show a subtle fade indicator at the bottom:

```tsx
<div className="relative">
  <div className="max-h-[60vh] overflow-y-auto">
    {/* Content */}
  </div>
  {/* Fade indicator */}
  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
</div>
```

---

## Responsive Behavior

| Breakpoint | Columns | Card Width |
|-----------|---------|------------|
| Mobile (< 640px) | 1 | Full width |
| Tablet (640-1024px) | 2 | 50% |
| Desktop (> 1024px) | 3 | 33% |

---

## Accessibility

- Each card is a semantic `<article>` element
- Project title is a heading (`<h3>`)
- Tags are proper badges with ARIA labels
- "View Case Study" link has descriptive text
- Focus management for keyboard navigation
- Color contrast meets WCAG AA (4.5:1 for text)

---

## Print Behavior

In print mode:
- All cards display without hover effects
- Gradient placeholders print as solid colors
- Tags show as inline text
- "View Case Study" link shows full URL
- Cards don't break across pages (`page-break-inside: avoid`)

---

## File References

- `src/components/sections/Portfolio.tsx` — Main portfolio section
- `src/components/ui/card.tsx` — Card primitive
- `src/components/ui/badge.tsx` — Tag badges
- `src/content/en.ts` — English project data
- `src/content/fa.ts` — Persian project data
- `src/types/content.ts` — Project type definition
