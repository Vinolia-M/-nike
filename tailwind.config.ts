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
      },
      fontSize: {
        12: '12px',
        14: '14px',
        18: '18px',
        20: '20px',
        25: '25px',
        30: '30px',
        36: '36px',
        40: '40px',
      },
      lineHeight: {
        26: '26px',
        40: '40px',
      },
      spacing: {
        40: '40px',
        100: '100px',
        300: '300px',
      },
      rotate: {
        '45': '45deg',
        '135': '135deg',
      },
    },
  },
  plugins: [],
} satisfies Config;
