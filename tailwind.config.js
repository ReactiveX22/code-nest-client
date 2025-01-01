/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'var(--primary-500)',
          400: 'var(--primary-400)',
        },
        secondary: {
          500: 'var(--secondary-500)',
          400: 'var(--secondary-400)',
        },
        neutral: 'var(--neutral)',
        bg: {
          900: 'var(--bg-900)',
          800: 'var(--bg-800)',
          700: 'var(--bg-700)',
        },
        text: {
          100: 'var(--text-100)',
          200: 'var(--text-200)',
        },
      },
    },
  },
  plugins: [],
};
