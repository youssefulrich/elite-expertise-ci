/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fdecea',
          100: '#f9c9c6',
          500: '#C0392B',
          600: '#a93226',
          700: '#922B21',
          900: '#1C1C1E',
        },
        accent: {
          400: '#C0392B',
          500: '#922B21',
        },
        dark: {
          900: '#1C1C1E',
          800: '#2c2c2e',
          700: '#3a3a3c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
