import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E2231A",
        accent: "#E2231A",
        surface: "#FFFFFF",
        "bg-subtle": "#F9F9F9",
        "text-dark": "#1A1A1A",
        "text-muted": "#6B6B6B",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "slide-in": "slide-in 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
