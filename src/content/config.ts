export interface ProjectMeta {
  id: string;
  slug: string;
  category: string;
  year: string;
  location?: string;
  accent?: string;
  technologies: string[];
  coverImage: string;
  mobileCover: string;
  heroImage: string;
  thumbnail: string;
  gallery: { src: string; alt: string; caption?: string }[];
  links: { label: string; url: string }[];
  status: "completed" | "in-progress" | "concept";
  featured: boolean;
  experienceId: string;
}

export const siteConfig = {
  assets: {
    profile: "/assets/images/profile/profile.webp",
    resume: "/assets/documents/resume.pdf",
  },

  projects: {
    daewoo: {
      id: "daewoo",
      slug: "daewoo",
      category: "Campaign Experience",
      year: "2023",
      location: "Isfahan, Iran",
      accent: "#3B82F6",
      technologies: ["Figma", "Landing Pages", "Prototyping", "Responsive Design"],
      coverImage: "/assets/images/projects/project-01.webp",
      mobileCover: "/assets/images/projects/project-01-mobile.webp",
      heroImage: "/assets/images/projects/project-01.webp",
      thumbnail: "/assets/images/projects/project-01.webp",
      gallery: [
        { src: "/assets/images/projects/project-01.webp", alt: "Daewoo — Digital Platform" },
        { src: "/assets/images/projects/project-01-2.webp", alt: "Daewoo — Platform Detail" },
        { src: "/assets/images/projects/project-01-3.webp", alt: "Daewoo — Mobile View" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: true,
      experienceId: "shadow",
    },
    snowa: {
      id: "snowa",
      slug: "snowa",
      category: "Campaign Experience",
      year: "2023",
      location: "Isfahan, Iran",
      accent: "#06B6D4",
      technologies: ["Figma", "Landing Pages", "Responsive Design", "Visual Design"],
      coverImage: "/assets/images/projects/project-02.webp",
      mobileCover: "/assets/images/projects/project-02-mobile.webp",
      heroImage: "/assets/images/projects/project-02.webp",
      thumbnail: "/assets/images/projects/project-02.webp",
      gallery: [
        { src: "/assets/images/projects/project-02.webp", alt: "Snowa — Smart Home Interface" },
        { src: "/assets/images/projects/project-02-2.webp", alt: "Snowa — Device Management" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: true,
      experienceId: "shadow",
    },
    ardesia: {
      id: "ardesia",
      slug: "ardesia",
      category: "Campaign Experience",
      year: "2022",
      location: "Isfahan, Iran",
      accent: "#8B5CF6",
      technologies: ["Figma", "Digital Interface", "Campaign Design"],
      coverImage: "/assets/images/projects/project-04.webp",
      mobileCover: "/assets/images/projects/project-04-mobile.webp",
      heroImage: "/assets/images/projects/project-04.webp",
      thumbnail: "/assets/images/projects/project-04.webp",
      gallery: [
        { src: "/assets/images/projects/project-04.webp", alt: "Ardesia — Design System" },
        { src: "/assets/images/projects/project-04-2.webp", alt: "Ardesia — Components" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: true,
      experienceId: "shadow",
    },
    entekhab: {
      id: "entekhab",
      slug: "entekhab",
      category: "Enterprise Product",
      year: "2022",
      location: "Isfahan, Iran",
      accent: "#10B981",
      technologies: ["Figma", "Digital Product", "Corporate Design"],
      coverImage: "/assets/images/projects/project-03.webp",
      mobileCover: "/assets/images/projects/project-03-mobile.webp",
      heroImage: "/assets/images/projects/project-03.webp",
      thumbnail: "/assets/images/projects/project-03.webp",
      gallery: [
        { src: "/assets/images/projects/project-03.webp", alt: "Entekhab — Corporate Digital" },
        { src: "/assets/images/projects/project-03-2.webp", alt: "Entekhab — Brand System" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: true,
      experienceId: "shadow",
    },
    rahampars: {
      id: "rahampars",
      slug: "rahampars",
      category: "Corporate Website",
      year: "2023",
      location: "Shiraz, Iran",
      accent: "#F59E0B",
      technologies: ["Figma", "Web Design", "Responsive Design"],
      coverImage: "/assets/images/projects/project-06.webp",
      mobileCover: "/assets/images/projects/project-06-mobile.webp",
      heroImage: "/assets/images/projects/project-06.webp",
      thumbnail: "/assets/images/projects/project-06.webp",
      gallery: [
        { src: "/assets/images/projects/project-06.webp", alt: "Raham Pars — Corporate Website" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
    maanpolymer: {
      id: "maanpolymer",
      slug: "maanpolymer",
      category: "Corporate Website",
      year: "2023",
      location: "Shiraz, Iran",
      accent: "#F43F5E",
      technologies: ["Figma", "Web Design", "Responsive Design"],
      coverImage: "/assets/images/projects/project-07.webp",
      mobileCover: "/assets/images/projects/project-07-mobile.webp",
      heroImage: "/assets/images/projects/project-07.webp",
      thumbnail: "/assets/images/projects/project-07.webp",
      gallery: [
        { src: "/assets/images/projects/project-07.webp", alt: "Maan Polymer — Corporate Website" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
    fadakargold: {
      id: "fadakargold",
      slug: "fadakargold",
      category: "E-commerce",
      year: "2022",
      location: "Shiraz, Iran",
      accent: "#D4A574",
      technologies: ["Figma", "E-commerce", "Web Design"],
      coverImage: "/assets/images/projects/project-08.webp",
      mobileCover: "/assets/images/projects/project-08-mobile.webp",
      heroImage: "/assets/images/projects/project-08.webp",
      thumbnail: "/assets/images/projects/project-08.webp",
      gallery: [
        { src: "/assets/images/projects/project-08.webp", alt: "Fadakar Gold — E-commerce" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
    adriankesht: {
      id: "adriankesht",
      slug: "adriankesht",
      category: "Corporate Website",
      year: "2022",
      location: "Shiraz, Iran",
      accent: "#14B8A6",
      technologies: ["Figma", "Web Design", "Responsive Design"],
      coverImage: "/assets/images/projects/project-09.webp",
      mobileCover: "/assets/images/projects/project-09-mobile.webp",
      heroImage: "/assets/images/projects/project-09.webp",
      thumbnail: "/assets/images/projects/project-09.webp",
      gallery: [
        { src: "/assets/images/projects/project-09.webp", alt: "Adrien Kesht — Corporate Website" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
    erfanwatch: {
      id: "erfanwatch",
      slug: "erfanwatch",
      category: "E-commerce",
      year: "2022",
      location: "Shiraz, Iran",
      accent: "#6366F1",
      technologies: ["Figma", "E-commerce", "Web Design"],
      coverImage: "/assets/images/projects/project-10.webp",
      mobileCover: "/assets/images/projects/project-10-mobile.webp",
      heroImage: "/assets/images/projects/project-10.webp",
      thumbnail: "/assets/images/projects/project-10.webp",
      gallery: [
        { src: "/assets/images/projects/project-10.webp", alt: "Erfan Watch — E-commerce" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
  },
};

export type ProjectSlug = keyof typeof siteConfig.projects;
