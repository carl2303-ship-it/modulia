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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
