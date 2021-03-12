const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        18: "4.5rem"
      },
      colors: {
        orange: colors.orange
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
