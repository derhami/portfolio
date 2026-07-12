# Changelog — Derhami

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-07-12

### Changed
- CapsuleMenu: removed print button, improved mobile touch targets (px-4 py-2.5, w-9 h-9)
- CapsuleMenu: increased item gaps for better tap accuracy on mobile
- Work: restructured navigation layout — arrows flank counter + separator + dot indicators
- Work: external link button separated from navigation controls
- Assistant: FAB repositioned to `bottom-[84px]` to avoid capsule menu overlap
- Assistant: chat panel gets `mb-[76px]` bottom margin on mobile, max-height `calc(100dvh-100px)`
- App.tsx: full-width sections on mobile (`max-w-full` on `<main>`)
- index.css: sections get `height: 100%` on mobile for full viewport fit
- index.css: `.section-snap` gets `height: 100%` for full-height sections

### Added
- Work: touch swipe support on project cards (left/right navigation via touch)
- ProjectModal: touch swipe support on gallery images
- `.section-title` CSS class — sticky section titles on mobile (position: sticky, top: 0, z-index: 10)
- `.section-divider` hidden on mobile (`display: none` at max-width 768px)
- Section titles (About, Work, Experience, Skills, Contact) use `.section-title` class

### Removed
- Print button from CapsuleMenu (simplified mobile nav)
- Section dividers on mobile (cleaner full-width look)

## [0.2.0] — 2024-01-15

### Changed
- Replaced static timeline with interactive expandable timeline (accordion behavior)
- Replaced Projects section with rich Portfolio section (gradient placeholders, icons)
- Updated typography: Ubuntu Sans (EN) + Vazirmatn (FA) replacing Inter
- Updated navigation: simplified mobile menu (removed sidebar slide-out)
- Updated all animations to use Framer-style easing curves `[0.4, 0, 0.2, 1]`
- Updated CSS with full logical properties for RTL support
- Updated content types with rich portfolio data (gradient, icon fields)
- Updated i18n content files with 6 portfolio items and subtitles

### Added
- Portfolio section with internal scroll container (max-h 65vh)
- Rich portfolio cards with gradient + icon placeholders
- Interactive timeline with expand/collapse (spring physics)
- Custom scrollbar styling for internal scroll containers
- Documentation files:
  - 01_MASTER_PROMPT.md
  - 03_DESIGN_SYSTEM.md
  - 06_COMPONENTS.md
  - 08_RTL_GUIDE.md
  - 10_ANIMATION_RULES.md
  - 13_PRINT_MODE.md
  - 15_PORTFOLIO_CASE_STUDY.md
  - 16_PLACEHOLDER_ASSETS.md

### Removed
- Sidebar mobile navigation (replaced with inline dropdown)
- Progress bars (replaced with skill badges)
- Static non-interactive timeline
- Projects.tsx (replaced with Portfolio.tsx)
- Inter font (replaced with Ubuntu Sans)

### Fixed
- RTL positioning using logical properties (start/end instead of left/right)
- Print CSS handling for interactive timeline (shows all achievements)
- Print CSS handling for portfolio scroll container

## [0.1.0] — 2024-01-01

### Added
- Initial project setup with Vite + React + TypeScript
- TailwindCSS with custom design tokens (light/dark modes)
- shadcn/ui components (Button, Badge, Card, Separator)
- Framer Motion animations and micro-interactions
- Lucide Icons integration
- Bilingual i18n system (English + Persian RTL)
- Hero section with animated headline and CTAs
- About section with bio and skill highlights
- Experience section with timeline layout
- Skills section with categorized badges
- Projects section with interactive cards
- Contact section with social links
- Sticky navigation with smooth scroll
- Dark/light mode toggle
- Language switcher (EN/FA)
- Print CSS for A4 and Letter PDF export
- SEO optimization (OpenGraph, Twitter Card, Schema.org)
- robots.txt and sitemap.xml
- Favicon set and web app manifest
- GitHub Pages deployment workflow
- Custom domain configuration (hawid.ir)
- Responsive design (mobile, tablet, desktop)
- Accessibility features (WCAG 2.1 AA)
- prefers-reduced-motion support
- Scroll-triggered animations with Intersection Observer
