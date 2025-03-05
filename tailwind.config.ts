import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green_00: "#285238",
        green_01: "#366D4B",
        green_03: "#4A9667",
        brown_00: "#442F22",
        brown_01: "#96674A",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', ...fontFamily.sans],
        playfairDisplay: ['"Playfair"', ...fontFamily.sans],
      },
    },
  }, 
    plugins: [
      require('tailwindcss-animated')
    ],
} satisfies Config;
