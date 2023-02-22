/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['helvetica', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
