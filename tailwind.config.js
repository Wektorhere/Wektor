/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        panel: '#141414',
        line: '#262626'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif']
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0, 0, 0, 0.42)'
      }
    }
  },
  plugins: []
};