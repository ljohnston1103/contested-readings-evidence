import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8f5ee",
          100: "#ece4d4",
          200: "#d9c9a6",
          300: "#bfa15f",
          400: "#a77c2b",
          500: "#8d681f",
          600: "#6e511b",
          700: "#4d3a18",
          800: "#282516",
          900: "#121722",
        },
        archive: {
          blue: "#1b4f72",
          teal: "#0f766e",
          gold: "#c49a3f",
          ember: "#b45309",
          paper: "#fbf7ef",
          navy: "#0c1424",
        },
      },
      boxShadow: {
        card: "0 22px 70px -38px rgba(12, 20, 36, 0.55)",
        glow: "0 0 0 1px rgba(196, 154, 63, 0.18), 0 20px 50px -35px rgba(196, 154, 63, 0.8)",
      },
      fontFamily: {
        display: [
          "Literata",
          "Iowan Old Style",
          "Palatino Linotype",
          "Georgia",
          "serif",
        ],
        body: ["Aptos", "Segoe UI Variable", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "radial-archive":
          "radial-gradient(circle at top left, rgba(196,154,63,0.16), transparent 34%), radial-gradient(circle at 80% 10%, rgba(15,118,110,0.14), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
