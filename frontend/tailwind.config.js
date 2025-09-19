/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#229d00ff',
        secondary: '#6d0071ff',
      },
    },
  },
  plugins: [],
}