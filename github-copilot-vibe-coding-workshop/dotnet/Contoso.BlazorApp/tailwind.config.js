/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Components/**/*.{html,razor}',
    './wwwroot/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        'custom-amber': '#E5A000',
        'custom-blue': '#00B7FF',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}