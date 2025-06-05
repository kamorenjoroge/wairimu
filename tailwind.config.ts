import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e", // Green
        secondary: "#ffb524", // Yellow
        warning: "#ee0937",// Red
        dark: "#000000", // Black
        light: "#FFFFFF", // White
        back: "#dcfce7", // Light Green
      },
    },
  },
  plugins: [],
} satisfies Config;
