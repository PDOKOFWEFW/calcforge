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
        navy: {
          DEFAULT: "#0a1628",
          mid:     "#112240",
          light:   "#1e3a5f",
        },
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#1a56db",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        teal: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
        },
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          150: "#efede9",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "sm":     "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "md":     "0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)",
        "lg":     "0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
        "xl":     "0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)",
        "blue":   "0 4px 20px rgba(26,86,219,0.20)",
        "blue-lg":"0 8px 32px rgba(26,86,219,0.25)",
        "inner":  "inset 0 2px 6px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "navy-gradient":  "linear-gradient(135deg, #0a1628 0%, #112240 50%, #1e3a5f 100%)",
        "blue-gradient":  "linear-gradient(135deg, #1a56db 0%, #1d4ed8 100%)",
        "teal-gradient":  "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
        "stone-gradient": "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
        "mesh-blue":      "radial-gradient(at 20% 30%, rgba(26,86,219,0.08) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(13,148,136,0.06) 0px, transparent 50%)",
      },
      borderRadius: {
        "xl":  "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "fade-up":   "fadeUp 0.4s ease both",
        "fade-in":   "fadeIn 0.3s ease both",
        "count-up":  "countUp 0.3s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        countUp: {
          "0%":   { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
