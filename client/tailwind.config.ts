import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Paleta principal inspirada em ambiente gastronômico elegante
        primary: {
          50: "#fdf8f3", // Off-white cremoso
          100: "#faeee4", // Bege muito claro
          200: "#f3d9c4", // Bege claro
          300: "#e8bd9c", // Caramelo claro
          400: "#d99b6b", // Caramelo médio
          500: "#c7753d", // Bronze/caramelo principal
          600: "#b05d2a", // Bronze escuro
          700: "#924620", // Marrom médio
          800: "#73371c", // Marrom escuro
          900: "#5d2d17", // Marrom chocolate
        },
        // Tons neutros sofisticados
        neutral: {
          50: "#fafafa", // Branco puro
          100: "#f5f5f4", // Cinza muito claro
          200: "#e7e5e4", // Cinza claro
          300: "#d6d3d1", // Cinza médio claro
          400: "#a8a29e", // Cinza médio
          500: "#78716c", // Cinza escuro
          600: "#57534e", // Cinza muito escuro
          700: "#44403c", // Quase preto
          800: "#292524", // Preto suave
          900: "#1c1917", // Preto elegante
        },
        // Tons dourados para destaques
        accent: {
          50: "#fffef7", // Dourado muito claro
          100: "#fffbeb", // Dourado claro
          200: "#fef3c7", // Dourado suave
          300: "#fde68a", // Dourado médio
          400: "#fcd34d", // Dourado vibrante
          500: "#f59e0b", // Dourado principal
          600: "#d97706", // Dourado escuro
          700: "#b45309", // Dourado bronze
          800: "#92400e", // Dourado muito escuro
          900: "#78350f", // Dourado chocolate
        },
        // Tons verdes para elementos frescos
        secondary: {
          50: "#f0fdf4", // Verde muito claro
          100: "#dcfce7", // Verde claro
          200: "#bbf7d0", // Verde suave
          300: "#86efac", // Verde médio claro
          400: "#4ade80", // Verde médio
          500: "#22c55e", // Verde principal
          600: "#16a34a", // Verde escuro
          700: "#15803d", // Verde floresta
          800: "#166534", // Verde muito escuro
          900: "#14532d", // Verde profundo
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
