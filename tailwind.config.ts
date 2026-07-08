import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        modulia: {
          50: "#f4f7f2",
          100: "#e4ebe0",
          200: "#c9d7c2",
          300: "#a3b89a",
          400: "#7d9772",
          500: "#5f7a55",
          600: "#4a6142",
          700: "#3c4e36",
          800: "#32402e",
          900: "#2a3527",
          950: "#141c12",
        },
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6ddd0",
        },
        luxury: {
          forest: "#2E7D46",
          "forest-dark": "#1F5A31",
          graphite: "#111111",
          papyrus: "#F9F9F8",
          stone: "#E8E6E1",
          muted: "#6B6B6B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        ui: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 24px 64px -12px rgba(17, 17, 17, 0.12)",
        "luxury-sm": "0 8px 32px -8px rgba(17, 17, 17, 0.08)",
        glow: "0 0 40px rgba(46, 125, 70, 0.15)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
