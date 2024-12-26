/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          950: 'var(--bg-950)',
          900: 'var(--bg-900)',
          800: 'var(--bg-800)',
          700: 'var(--bg-700)',
        },
        text: {
          100: 'var(--text-100)',
          50: 'var(--text-50)',
        },
      },
    },
  },
  plugins: [],
};
