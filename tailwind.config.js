/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', content: ["./src/**/*.{html,ts}", "./src/**/*/*.{html,ts}"], theme: {
    fontFamily: {
      sans: ['Helvetica Neue', 'sans-serif'],
    }, extend: {
      keyframes: {
        headshake: {
          '0%': {
            transform: 'translateX(0)',
          }, '6.5%': {
            transform: 'translateX(-6px) rotateY(-9deg)',
          }, '18.5%': {
            transform: 'translateX(5px) rotateY(7deg)',
          }, '31.5%': {
            transform: 'translateX(-3px) rotateY(-5deg)',
          }, '43.5%': {
            transform: 'translateX(2px) rotateY(3deg)',
          }, '50%': {
            transform: 'translateX(0)',
          },
        }, heartbeat: {
          '0%': {transform: 'scale(1);'},
          '28%': {transform: 'scale(1.2);'},
          '70%': {transform: 'scale(1);'},
        },
      }
    }, animation: {
      headshake: 'headshake 1s ease-in-out infinite',
      heartbeat: 'heartbeat 2s',
    }
  }, plugins: [],
}
