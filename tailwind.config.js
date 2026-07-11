/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
        },
        background: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        foreground: "var(--fg)",
        title: "var(--fg-title)",
        body: "var(--fg-body)",
        muted: "var(--fg-muted)",
        subtle: "var(--fg-subtle)",
        faint: "var(--fg-faint)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
          solid: "var(--card-bg-solid)",
        },
        capsule: {
          bg: "var(--capsule-bg)",
          border: "var(--capsule-border)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
      },
      fontFamily: {
        sans: ['"Ubuntu"', "system-ui", "-apple-system", "sans-serif"],
        persian: ['"IRANYekanX"', "Tahoma", "sans-serif"],
        rooyin: ['"Rooyin"', '"IRANYekanX"', "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
