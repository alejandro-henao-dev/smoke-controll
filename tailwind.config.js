const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.slate,
        accent: colors.blue,
        success: colors.green,
        danger: colors.red 
      }
    },
  },
  plugins: [],
}

