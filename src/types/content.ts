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
  subtitle: string;
  paragraphs: string[];
  expertise: { title: string; icon: string }[];
  portrait: {
    src: string;
    mobileSrc?: string;
    alt: string;
  };
}

export interface ProjectContent {
  title: string;
  subtitle: string;
  client: string;
  role: string;
  overview: string;
  context?: string;
  contribution?: string;
  impact?: string;
  media?: { src: string; alt: string; caption?: string }[];
}

/* ========================================
   Work (Portfolio Section)
   ======================================== */

export type ProjectGroup = "agency" | "independent";

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
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  keyCollabs?: string[];
  skills?: string[];
}

export interface ExperienceContent {
  label: string;
  items: ExperienceItem[];
}

export interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

export interface ContactContent {
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  email: string;
  phone: string;
  website: string;
  links: ContactLink[];
  copyright: string;
  note: string;
  profileImage: string;
}

export interface LabelsContent {
  nav: {
    home: string;
    about: string;
    work: string;
    experience: string;
    contact: string;
  };
  modal: {
    close: string;
    visitSite: string;
    professionalExperience: string;
    context: string;
    myContribution: string;
    impact: string;
    technologies: string;
    links: string;
    nextProject: string;
    previousImage: string;
    nextImage: string;
    imageAlt: (index: number) => string;
  };
  work: {
    clickToView: string;
    visitWebsite: string;
    prevProject: string;
    nextProject: string;
    projectAlt: (index: number) => string;
  };
  experience: {
    clients: string;
  };
  assistant: {
    openLabel: string;
    dialogLabel: string;
    terminalTitle: string;
    welcomeMessage: string;
    moreQuestions: string;
    emailButton: string;
    emailSubject: string;
    emailQuestionPrefix: string;
    emailAnswerPrefix: string;
    emailMessagePrefix: string;
    placeholder: string;
    backToQuestions: string;
    showMore: string;
    showLess: string;
    close: string;
  };
  capsule: {
    sectionNav: string;
    toggleTheme: string;
    themeLight: string;
    themeDark: string;
    toggleLanguage: string;
    langFa: string;
    langEn: string;
    openMenu: string;
    closeMenu: string;
  };
}

/* ========================================
   SEO Metadata
   ======================================== */

export interface SeoContent {
  title: string;
  description: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogSiteName: string;
  jsonLd: Record<string, unknown>;
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
  contact: ContactContent;
  labels: LabelsContent;
  seo: SeoContent;
}
