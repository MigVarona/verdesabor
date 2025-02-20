import { noSSR } from "next/dynamic";
import type { Config } from "tailwindcss";

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
        'custom-yellow': '#ffdb00',
      },
      fontFamily: {
        fira: ['"Fira Sans"', 'Arial', 'sans-serif'],
        tisa: ['"ff-tisa-web-pro"', 'serif', 'Georgia'],
        noto: ['"Noto Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        duplet: ['Duplet', 'sans-serif'], 



      },
    },
  },
  plugins: [],
} satisfies Config;
