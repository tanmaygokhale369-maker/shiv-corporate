import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e5ff",
          200: "#bcd3ff",
          300: "#8eb8ff",
          400: "#5990ff",
          500: "#3366ff",
          600: "#1a45f5",
          700: "#1333e1",
          800: "#162bb6",
          900: "#182a8f",
          950: "#121b57",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e1e2e6",
          200: "#c3c4cc",
          300: "#9d9faa",
          400: "#797b88",
          500: "#5f616e",
          600: "#4b4c57",
          700: "#3e3f47",
          800: "#2a2b31",
          900: "#18191d",
          950: "#0d0d10",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0d0d10 0%, #121b57 50%, #0d0d10 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(51,102,255,0.1) 0%, rgba(13,13,16,0.6) 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(51, 102, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(51, 102, 255, 0.4)",
        "glow-brand": "0 0 30px rgba(51, 102, 255, 0.5)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        premium: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(51, 102, 255, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(51, 102, 255, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(51, 102, 255, 0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
