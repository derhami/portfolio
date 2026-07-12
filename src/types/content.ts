export type Locale = "en" | "fa";

/* ========================================
   Meta (SEO / OpenGraph)
   ======================================== */

export interface MetaContent {
  title: string;
  description: string;
}

/* ========================================
   Hero
   ======================================== */

export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  cta: string;
  secondaryCta: string;
}

/* ========================================
   About
   ======================================== */

export interface AboutContent {
  label: string;
  paragraphs: string[];
}

/* ========================================
   Project — Localizable Content
   ======================================== */

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectContent {
  title: string;
  subtitle: string;
  client: string;
  role: string;
  overview: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  outcome?: string[];
}

/* ========================================
   Work (Portfolio Section)
   ======================================== */

export interface WorkGroup {
  title: string;
  description: string;
}

export interface WorkContent {
  label: string;
  subtitle: string;
  groups: Record<string, WorkGroup>;
  items: Record<string, ProjectContent>;
}

/* ========================================
   Experience
   ======================================== */

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  type?: string;
  description: string;
  keyCollabs?: string[];
  skills?: string[];
}

export interface ExperienceContent {
  label: string;
  items: ExperienceItem[];
}

/* ========================================
   Skills
   ======================================== */

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface SkillsContent {
  label: string;
  groups: SkillGroup[];
}

/* ========================================
   Contact
   ======================================== */

export interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

export interface ContactContent {
  headline: string;
  email: string;
  phone: string;
  website: string;
  links: ContactLink[];
}

/* ========================================
   Root Content (per locale)
   ======================================== */

export interface Content {
  meta: MetaContent;
  hero: HeroContent;
  about: AboutContent;
  work: WorkContent;
  experience: ExperienceContent;
  skills: SkillsContent;
  contact: ContactContent;
}
