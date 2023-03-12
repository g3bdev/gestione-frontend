/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['Helvetica Neue', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
