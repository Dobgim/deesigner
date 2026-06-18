/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b9f1a',
          dark: '#076811',
          light: '#22c55e',
        },
        secondary: {
          DEFAULT: '#1e293b',
          dark: '#0f172a',
          light: '#334155',
        },
        bgLight: '#f8f0f0',
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
