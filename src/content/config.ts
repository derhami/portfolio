export interface ProjectMeta {
  id: string;
  slug: string;
  category: string;
  year: string;
  location?: string;
  technologies: string[];
  coverImage: string;
  heroImage: string;
  thumbnail: string;
  gallery: { src: string; alt: string; caption?: string }[];
  links: { label: string; url: string }[];
  status: "completed" | "in-progress" | "concept";
  featured: boolean;
}

export const siteConfig = {
  meta: {
    title: "Hamidreza Derhami — Senior Product Designer",
    description:
      "Senior Product Designer. Six years designing enterprise platforms, consumer apps, and design systems for Daewoo, Snowa, Entekhab Holding, and others.",
    url: "https://hawid.ir",
  },

  assets: {
    profile: "/assets/images/profile/profile.png",
    resume: "/assets/documents/resume.pdf",
  },

  contact: {
    email: "hi@hawid.ir",
    phone: "+98 933 484 7452",
    website: "https://hawid.ir",
  },

  social: {
    telegram: "https://t.me/derhami",
    linkedin: "https://linkedin.com/in/derhami",
    dribbble: "https://dribbble.com/derhami",
    instagram: "https://instagram.com/derhami",
    threads: "https://threads.net/@derhami",
    bale: "https://bale.ai/derhamix",
  },

  projects: {
    daewoo: {
      id: "daewoo",
      slug: "daewoo",
      category: "Digital Platform",
      year: "2023",
      location: "Isfahan, Iran",
      technologies: ["Figma", "Design System", "Prototyping", "User Research"],
      coverImage: "/assets/images/projects/project-01.jpg",
      heroImage: "/assets/images/projects/project-01.jpg",
      thumbnail: "/assets/images/projects/project-01.jpg",
      gallery: [
        { src: "/assets/images/projects/project-01.jpg", alt: "Daewoo — Digital Platform" },
        { src: "/assets/images/projects/project-01-2.jpg", alt: "Daewoo — Platform Detail" },
        { src: "/assets/images/projects/project-01-3.jpg", alt: "Daewoo — Mobile View" },
      ],
      links: [
        { label: "Visit Site", url: "https://daewoo.com" },
      ],
      status: "completed" as const,
      featured: true,
    },
    snowa: {
      id: "snowa",
      slug: "snowa",
      category: "Smart Home Interface",
      year: "2023",
      location: "Isfahan, Iran",
      technologies: ["Figma", "IoT", "Dashboard Design", "Accessibility"],
      coverImage: "/assets/images/projects/project-02.jpg",
      heroImage: "/assets/images/projects/project-02.jpg",
      thumbnail: "/assets/images/projects/project-02.jpg",
      gallery: [
        { src: "/assets/images/projects/project-02.jpg", alt: "Snowa — Smart Home Interface" },
        { src: "/assets/images/projects/project-02-2.jpg", alt: "Snowa — Device Management" },
      ],
      links: [],
      status: "completed" as const,
      featured: true,
    },
    entekhab: {
      id: "entekhab",
      slug: "entekhab",
      category: "Corporate Digital",
      year: "2022",
      location: "Isfahan, Iran",
      technologies: ["Figma", "Design System", "Multi-brand", "Component Library"],
      coverImage: "/assets/images/projects/project-03.jpg",
      heroImage: "/assets/images/projects/project-03.jpg",
      thumbnail: "/assets/images/projects/project-03.jpg",
      gallery: [
        { src: "/assets/images/projects/project-03.jpg", alt: "Entekhab — Corporate Digital" },
        { src: "/assets/images/projects/project-03-2.jpg", alt: "Entekhab — Brand System" },
      ],
      links: [],
      status: "completed" as const,
      featured: true,
    },
    ardesia: {
      id: "ardesia",
      slug: "ardesia",
      category: "Design System",
      year: "2022",
      location: "Isfahan, Iran",
      technologies: ["Figma", "Design Tokens", "Component Library", "WCAG 2.1 AA"],
      coverImage: "/assets/images/projects/project-04.jpg",
      heroImage: "/assets/images/projects/project-04.jpg",
      thumbnail: "/assets/images/projects/project-04.jpg",
      gallery: [
        { src: "/assets/images/projects/project-04.jpg", alt: "Ardesia — Design System" },
        { src: "/assets/images/projects/project-04-2.jpg", alt: "Ardesia — Components" },
      ],
      links: [],
      status: "completed" as const,
      featured: true,
    },
    shadow: {
      id: "shadow",
      slug: "shadow",
      category: "Brand Identity",
      year: "2021",
      location: "Isfahan, Iran",
      technologies: ["Figma", "Branding", "Typography", "Web Design"],
      coverImage: "/assets/images/projects/project-05.jpg",
      heroImage: "/assets/images/projects/project-05.jpg",
      thumbnail: "/assets/images/projects/project-05.jpg",
      gallery: [
        { src: "/assets/images/projects/project-05.jpg", alt: "Shadow — Brand Identity" },
        { src: "/assets/images/projects/project-05-2.jpg", alt: "Shadow — Website" },
      ],
      links: [],
      status: "completed" as const,
      featured: true,
    },
  } as const,
} as const;

export type ProjectSlug = keyof typeof siteConfig.projects;
