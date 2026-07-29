import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['P22 Mackinac W01 Book', 'Noto Serif SC', 'Georgia', 'serif'],
      },
      spacing: {
        26: '6.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
