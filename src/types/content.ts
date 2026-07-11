export type Locale = "en" | "fa";

export interface MetaContent {
  title: string;
  description: string;
}

export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  cta: string;
  secondaryCta: string;
}

export interface AboutContent {
  label: string;
  paragraphs: string[];
}

export interface WorkItem {
  client: string;
  project: string;
  role: string;
  period: string;
  description: string;
  url?: string;
  longDescription: string;
  highlights: string[];
  images: string[];
}

export interface WorkContent {
  label: string;
  items: WorkItem[];
}

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

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface SkillsContent {
  label: string;
  groups: SkillGroup[];
}

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

export interface Content {
  meta: MetaContent;
  hero: HeroContent;
  about: AboutContent;
  work: WorkContent;
  experience: ExperienceContent;
  skills: SkillsContent;
  contact: ContactContent;
}
