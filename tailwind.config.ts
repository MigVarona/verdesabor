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
        renew: {
          accent: "#ffdb00",
          dark: "#111827",
          sage: "#4a7c59",
          cream: "#fafaf7",
          muted: "#6b7280",
        },
        "custom-yellow": "#ffdb00",
      },
      fontFamily: {
        sans: ['"Noto Sans"', "system-ui", "sans-serif"],
        serif: ['"PT Serif"', "Georgia", "serif"],
        display: ['"Noto Sans"', "system-ui", "sans-serif"],
        fira: ['"Fira Sans"', "Arial", "sans-serif"],
        tisa: ['"PT Serif"', "Georgia", "serif"],
        noto: ['"Noto Sans"', '"Helvetica Neue"', "Arial", "sans-serif"],
        duplet: ["Duplet", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
