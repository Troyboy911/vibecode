/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}
