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
    profile: "/assets/images/profile/profile.png",
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
      coverImage: "/assets/images/projects/project-01.jpg",
      mobileCover: "/assets/images/projects/project-01-mobile.jpg",
      heroImage: "/assets/images/projects/project-01.jpg",
      thumbnail: "/assets/images/projects/project-01.jpg",
      gallery: [
        { src: "/assets/images/projects/project-01.jpg", alt: "Daewoo — Digital Platform" },
        { src: "/assets/images/projects/project-01-2.jpg", alt: "Daewoo — Platform Detail" },
        { src: "/assets/images/projects/project-01-3.jpg", alt: "Daewoo — Mobile View" },
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
      coverImage: "/assets/images/projects/project-02.jpg",
      mobileCover: "/assets/images/projects/project-02-mobile.jpg",
      heroImage: "/assets/images/projects/project-02.jpg",
      thumbnail: "/assets/images/projects/project-02.jpg",
      gallery: [
        { src: "/assets/images/projects/project-02.jpg", alt: "Snowa — Smart Home Interface" },
        { src: "/assets/images/projects/project-02-2.jpg", alt: "Snowa — Device Management" },
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
      coverImage: "/assets/images/projects/project-04.jpg",
      mobileCover: "/assets/images/projects/project-04-mobile.jpg",
      heroImage: "/assets/images/projects/project-04.jpg",
      thumbnail: "/assets/images/projects/project-04.jpg",
      gallery: [
        { src: "/assets/images/projects/project-04.jpg", alt: "Ardesia — Design System" },
        { src: "/assets/images/projects/project-04-2.jpg", alt: "Ardesia — Components" },
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
      coverImage: "/assets/images/projects/project-03.jpg",
      mobileCover: "/assets/images/projects/project-03-mobile.jpg",
      heroImage: "/assets/images/projects/project-03.jpg",
      thumbnail: "/assets/images/projects/project-03.jpg",
      gallery: [
        { src: "/assets/images/projects/project-03.jpg", alt: "Entekhab — Corporate Digital" },
        { src: "/assets/images/projects/project-03-2.jpg", alt: "Entekhab — Brand System" },
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
      coverImage: "/assets/images/projects/project-06.jpg",
      mobileCover: "/assets/images/projects/project-06-mobile.jpg",
      heroImage: "/assets/images/projects/project-06.jpg",
      thumbnail: "/assets/images/projects/project-06.jpg",
      gallery: [
        { src: "/assets/images/projects/project-06.jpg", alt: "Raham Pars — Corporate Website" },
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
      coverImage: "/assets/images/projects/project-07.jpg",
      mobileCover: "/assets/images/projects/project-07-mobile.jpg",
      heroImage: "/assets/images/projects/project-07.jpg",
      thumbnail: "/assets/images/projects/project-07.jpg",
      gallery: [
        { src: "/assets/images/projects/project-07.jpg", alt: "Maan Polymer — Corporate Website" },
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
      coverImage: "/assets/images/projects/project-08.jpg",
      mobileCover: "/assets/images/projects/project-08-mobile.jpg",
      heroImage: "/assets/images/projects/project-08.jpg",
      thumbnail: "/assets/images/projects/project-08.jpg",
      gallery: [
        { src: "/assets/images/projects/project-08.jpg", alt: "Fadakar Gold — E-commerce" },
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
      coverImage: "/assets/images/projects/project-09.jpg",
      mobileCover: "/assets/images/projects/project-09-mobile.jpg",
      heroImage: "/assets/images/projects/project-09.jpg",
      thumbnail: "/assets/images/projects/project-09.jpg",
      gallery: [
        { src: "/assets/images/projects/project-09.jpg", alt: "Adrien Kesht — Corporate Website" },
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
      coverImage: "/assets/images/projects/project-10.jpg",
      mobileCover: "/assets/images/projects/project-10-mobile.jpg",
      heroImage: "/assets/images/projects/project-10.jpg",
      thumbnail: "/assets/images/projects/project-10.jpg",
      gallery: [
        { src: "/assets/images/projects/project-10.jpg", alt: "Erfan Watch — E-commerce" },
      ],
      links: [] as { label: string; url: string }[],
      status: "completed",
      featured: false,
      experienceId: "derhami",
    },
  },
};

export type ProjectSlug = keyof typeof siteConfig.projects;
