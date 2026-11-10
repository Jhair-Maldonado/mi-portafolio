const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          300: '#66c799',
          400: '#2fa16a',
          500: '#238f56',
        },
        accent: colors.sky,
        neutral: colors.slate,
        background: '#071022',
        surface: '#0b1220',
      },
      borderRadius: {
        'xl-2': '1rem',
      },
    },
  },
  plugins: [],
}
