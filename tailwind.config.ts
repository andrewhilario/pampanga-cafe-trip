import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        latte: {
          50: '#FDFBF7',
          100: '#F7F3EA',
          200: '#EFE7D8',
          300: '#DFCDB8',
          400: '#CDB194',
          500: '#B89473',
          600: '#9E7756',
          700: '#7E5B3E',
          800: '#5F442D',
          900: '#2C1810', // Deep espresso
        },
        terracotta: {
          50: '#FCF3F0',
          100: '#FBECE8',
          200: '#F7D6CD',
          300: '#EFA997',
          400: '#E07A5F',
          500: '#C86446',
          600: '#A94E35',
          700: '#8A3C26',
        },
        sage: {
          50: '#F4F7F4',
          100: '#EEF3EE',
          200: '#D7E4D8',
          300: '#B8CEBB',
          400: '#93B497',
          500: '#6A8E72',
          600: '#54755B',
          700: '#415C47',
        },
        mustard: {
          50: '#FAF5EC',
          100: '#FCF5E8',
          200: '#F7E7C6',
          300: '#EDD19A',
          400: '#E2BA69',
          500: '#D4973B',
          600: '#B57C26',
          700: '#8F5E18',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        'drawer': '0 -10px 30px rgba(44, 24, 16, 0.12)',
        'warm': '0 4px 20px -2px rgba(44, 24, 16, 0.08), 0 2px 6px -1px rgba(44, 24, 16, 0.04)',
        'warm-lg': '0 10px 30px -4px rgba(44, 24, 16, 0.12), 0 4px 10px -2px rgba(44, 24, 16, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
