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
        navy:  { DEFAULT: "#0a1628", mid: "#112240", light: "#1e3a5f" },
        brand: { 50:"#eff6ff",100:"#dbeafe",400:"#60a5fa",500:"#3b82f6",600:"#1a56db",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a" },
        teal:  { 50:"#f0fdfa",100:"#ccfbf1",500:"#14b8a6",600:"#0d9488",700:"#0f766e" },
        gold:  { 50:"#fffbeb",100:"#fef3c7",500:"#f59e0b",600:"#d97706",700:"#b45309" },
        stone: { 50:"#fafaf9",100:"#f5f5f4",150:"#efede9",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09" },
      },
      fontFamily: {
        sans:    ["Geist", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono:    ["Geist Mono", "monospace"],
      },
      boxShadow: {
        "sm":   "0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06)",
        "md":   "0 4px 16px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.05)",
        "lg":   "0 12px 40px rgba(0,0,0,.10),0 4px 12px rgba(0,0,0,.06)",
        "blue": "0 4px 20px rgba(26,86,219,.20)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg,#0a1628 0%,#112240 50%,#1e3a5f 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
