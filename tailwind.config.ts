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
        matteBlack: "#0a0a0c",
        matteCard: "#121216",
        matteElevated: "#18181f",
        matteBorder: "#26262e",
        cyberOrange: "#ff5722",
        flameOrange: "#ff6b00",
        neonOrange: "#f97316",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        orangeGlow: "0 0 25px -5px rgba(255, 87, 34, 0.25)",
        cardBox: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      }
    },
  },
  plugins: [],
};
export default config;
