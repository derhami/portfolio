import type { Content } from "@/types/content";

export const enContent: Content = {
  meta: {
    title: "Hamidreza Derhami — Senior Product Designer",
    description:
      "Senior Product Designer. Six years designing enterprise platforms, consumer apps, and design systems for Daewoo, Snowa, Entekhab Holding, and others.",
  },
  hero: {
    name: "Hamidreza Derhami",
    role: "Senior Product & UI/UX Designer",
    tagline:
      "I design digital experiences that balance user needs, business goals, and engineering constraints.",
    description:
      "Over the past years, I've designed digital products and experiences across different industries, collaborating with multidisciplinary teams to turn complex ideas into intuitive and scalable solutions.\n\nThrough my role at Shadow Digital Marketing Agency, I contributed to digital experiences for brands including Daewoo, Snowa, Ardesia and Entekhab Holding, while also leading independent projects for businesses in various industries.",
    stats: [],
    cta: "View Selected Work",
    secondaryCta: "Let's Talk",
  },
  about: {
    label: "About",
    paragraphs: [
      "I believe good design is not only about creating beautiful interfaces.\n\nA successful product is the result of balancing user expectations, business objectives and technical realities.\n\nThat perspective has shaped the way I approach every project—from research and product thinking to interface design, design systems and developer handoff.\n\nWhether working independently or collaborating through Shadow Digital Marketing Agency, my focus remains the same: designing digital products that are clear, practical and genuinely useful.",
    ],
  },
  work: {
    label: "Selected Work",
    items: {
      daewoo: {
        title: "Digital Platform",
        subtitle: "End-to-end platform redesign",
        client: "Daewoo",
        role: "Lead Designer",
        overview:
          "Redesigned the customer-facing platform. Simplified product catalogs into intuitive browsing across all touchpoints.",
        challenge:
          "Daewoo's existing digital platform had a complex, fragmented product catalog that overwhelmed users and led to high bounce rates. The challenge was to unify the browsing experience across web, mobile, and in-store kiosks while maintaining brand consistency.",
        approach:
          "Led deep user research with 200+ participants to understand pain points. Restructured information architecture based on user mental models. Iterative prototyping with continuous feedback loops from stakeholders and end users.",
        solution:
          "Created a unified, conversion-focused browsing experience with intuitive navigation, smart filtering, and consistent design language across all touchpoints. Implemented a cross-platform design system for long-term maintainability.",
        outcome: [
          "35% reduction in bounce rate",
          "48% increase in product engagement",
          "Cross-platform design system",
          "User research with 200+ participants",
        ],
      },
      snowa: {
        title: "Smart Home Interface",
        subtitle: "IoT control dashboard",
        client: "Snowa",
        role: "Product Designer",
        overview:
          "Control interface for Snowa's smart home ecosystem. Complex device management made simple through clear information architecture.",
        challenge:
          "Managing 50+ device types across lighting, climate, security, and energy required a unified interface that felt simple and approachable despite the underlying complexity.",
        approach:
          "Mapped device interaction patterns across all categories. Designed a unified dashboard with real-time status, scene management, and automated routines. Accessibility-first approach ensured inclusivity.",
        solution:
          "Created a primary control interface with real-time device monitoring, scene management, and automated routines. Reduced average task completion time from 12 seconds to 4 seconds through progressive disclosure and contextual controls.",
        outcome: [
          "50+ device types supported",
          "67% faster task completion",
          "Real-time device monitoring",
          "Accessibility-first approach",
        ],
      },
      entekhab: {
        title: "Corporate Digital",
        subtitle: "Multi-brand digital ecosystem",
        client: "Entekhab Holding",
        role: "UI/UX Designer",
        overview:
          "Unified digital presence across a diverse corporate portfolio. Balanced brand consistency with modern usability.",
        challenge:
          "Maintaining distinct brand identities while ensuring a cohesive user experience across 12+ digital products for Entekhab Holding's diverse portfolio of brands.",
        approach:
          "Developed a flexible design system with shared components and brand-specific themes. Created governance guidelines for consistent application across teams.",
        solution:
          "Built a multi-brand design system with shared core components and brand-specific theme overlays. Enabled parallel design workflows while maintaining consistency.",
        outcome: [
          "12+ digital products unified",
          "40% faster design-to-dev handoff",
          "Multi-brand design system",
          "Consistent UX across portfolio",
        ],
      },
      ardesia: {
        title: "Design System",
        subtitle: "Scalable component ecosystem",
        client: "Ardesia",
        role: "Design Lead",
        overview:
          "Scalable design system serving multiple product teams. Tokens, components, and docs that cut handoff time by 60%.",
        challenge:
          "Multiple product teams were working with inconsistent design patterns, leading to fragmented user experiences and slow design-to-development handoff.",
        approach:
          "Built a comprehensive design system from scratch with token-based architecture, Figma variables, and living documentation. Established governance and contribution guidelines.",
        solution:
          "Created a token-based architecture with Figma variables, a component library with 80+ components, and living documentation. Components were built with accessibility baked in, supporting WCAG 2.1 AA standards.",
        outcome: [
          "80+ reusable components",
          "3x faster design workflow",
          "90% reduction in inconsistencies",
          "WCAG 2.1 AA compliant",
        ],
      },
      shadow: {
        title: "Brand Identity",
        subtitle: "Complete brand ecosystem",
        client: "Shadow Agency",
        role: "Brand Designer",
        overview:
          "Complete brand identity and digital presence for a creative agency. Logo, website, visual language.",
        challenge:
          "Shadow Agency needed a premium brand identity that would differentiate them in a competitive marketing agency landscape and attract higher-tier clients.",
        approach:
          "Developed comprehensive brand strategy through competitive analysis and stakeholder workshops. Created a cohesive visual language system spanning logo, typography, color, and digital presence.",
        solution:
          "Designed a complete brand identity including logo, visual language system, typography guidelines, color palette, and full website redesign. The new identity established a premium market position.",
        outcome: [
          "Full brand identity system",
          "Website redesign",
          "Premium market positioning",
          "6-month client growth",
        ],
      },
    },
  },
  experience: {
    label: "Experience",
    items: [
      {
        company: "Shadow Marketing Agency",
        role: "UI/UX Designer",
        period: "Oct 2024 — Present",
        location: "Isfahan, Iran",
        type: "Full-time · On-site",
        description:
          "Designed user-centric digital products across technology, e-commerce, and education industries. Developed scalable design systems and component libraries based on Figma and Tailwind CSS principles. Worked closely with front-end developers to ensure seamless design-to-code translation. Led usability testing sessions to validate design decisions and improve user experiences.",
        keyCollabs: ["Entekhab Group", "Daewoo", "Snowa", "Ardesia", "Digisun"],
        skills: ["UI Design", "UX Design", "Wireframing", "Prototyping", "Design Systems", "Developer Collaboration", "Usability Testing"],
      },
      {
        company: "Derhami",
        role: "UI/UX Designer",
        period: "Nov 2021 — Present",
        location: "Shiraz, Iran",
        type: "Self-employed",
        description:
          "Designed a variety of websites based on client needs, ranging from landing pages to full product platforms. Contributed to planning and wireframing processes based on user/business goals. Designed responsive UIs optimized for both performance and accessibility. Worked closely with the development team to maintain consistency and design integrity across projects.",
        keyCollabs: ["AdrianKesh", "FadakarGold", "ErfanWatch"],
        skills: ["UI Design", "UX Design", "Wireframing", "Prototyping", "Responsive Design", "Accessibility", "Client Collaboration"],
      },
      {
        company: "Ertebat Group",
        role: "UI/UX Designer",
        period: "Jun 2016 — Jul 2017",
        location: "Tehran, Iran",
        type: "Full-time · On-site",
        description:
          "Contributed to the redesign of the company's core website to unify multiple service branches under one digital experience. Designed the entire user interface for 'Call Log' — a centralized web-based dashboard system for real-time monitoring of call center devices. Created flows, wireframes, and high-fidelity mockups that simplified complex data interactions.",
        keyCollabs: [],
        skills: ["Web Application Design", "Mobile Application Design", "Dashboard Design"],
      },
    ],
  },
  skills: {
    label: "Skills",
    groups: [
      {
        title: "Design",
        icon: "palette",
        items: [
          "Product Design",
          "UI Design",
          "UX Research",
          "Design Systems",
          "Prototyping",
          "Interaction Design",
          "Figma",
          "Framer",
        ],
      },
      {
        title: "Development",
        icon: "code",
        items: [
          "React / TypeScript",
          "TailwindCSS",
          "HTML / CSS",
          "JavaScript",
          "Git",
          "Responsive Design",
        ],
      },
      {
        title: "Process",
        icon: "workflow",
        items: [
          "Design Strategy",
          "User Research",
          "Workshop Facilitation",
          "Agile / Scrum",
          "Developer Handoff",
          "Accessibility",
        ],
      },
    ],
  },
  contact: {
    headline: "Let's build something.",
    email: "hi@hawid.ir",
    phone: "+98 933 484 7452",
    website: "hawid.ir",
    links: [
      {
        label: "Telegram",
        url: "https://t.me/derhami",
        icon: "message-circle",
      },
      {
        label: "LinkedIn",
        url: "https://linkedin.com/in/derhami",
        icon: "link",
      },
      {
        label: "Dribbble",
        url: "https://dribbble.com/derhami",
        icon: "heart",
      },
      {
        label: "Instagram",
        url: "https://instagram.com/derhami",
        icon: "globe",
      },
      {
        label: "Threads",
        url: "https://threads.net/@derhami",
        icon: "link",
      },
      {
        label: "Bale",
        url: "https://bale.ai/derhamix",
        icon: "message-circle",
      },
    ],
  },
};
