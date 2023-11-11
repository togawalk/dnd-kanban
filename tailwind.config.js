/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      mono: ['JetBrains Mono', 'SFMono-Regular'],
    },
    extend: {
      colors: {
        background: '#0D1117',
        secondary: '#161C22',
      },
    },
  },
  plugins: [],
}
