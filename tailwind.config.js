/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          primary: '#EE4D2D',
          dark: '#D73211',
          light: '#FFE4DD',
        },
      },
    },
  },
  plugins: [],
}
