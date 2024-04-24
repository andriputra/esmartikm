const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#dbf6ff',
          100: '#c0f0ff',
          200: '#94e8ff',
          300: '#5fd9ff',
          400: '#37c2ff',
          500: '#18a8ff',
          600: '#0092fc',
          700: '#0075d5',
          800: '#0765aa',
          900: '#0c3f69',
        },
        gray: colors.blueGray,
        blue: {
          50: '#dbf6ff',
          100: '#c0f0ff',
          200: '#94e8ff',
          300: '#5fd9ff',
          400: '#37c2ff',
          500: '#18a8ff',
          600: '#0092fc',
          700: '#0075d5',
          800: '#0765aa',
          900: '#0c3f69',
        },
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        cursive: ['Berkshire Swash', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('./plugins/colors'),
  ],
}
