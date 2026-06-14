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
          accent: "#d7ff4f",
          dark: "#18211d",
          sage: "#2f6f52",
          cream: "#f7f5ef",
          muted: "#68736d",
          paper: "#fffdf6",
          ink: "#0f1714",
          clay: "#b86f47",
          mist: "#e8eee6",
          border: "#dfddd2",
        },
        "custom-yellow": "#d7ff4f",
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
        card: "0 1px 2px 0 rgb(15 23 20 / 0.05), 0 10px 30px -24px rgb(15 23 20 / 0.25)",
        "card-hover": "0 22px 55px -32px rgb(15 23 20 / 0.35), 0 8px 18px -14px rgb(15 23 20 / 0.2)",
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
