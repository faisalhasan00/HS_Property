/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        accent: {
          DEFAULT: '#C9A84C', // Gold
          hover: '#e0bf64',
        },
        textPrimary: '#F5F0E8',
        textMuted: '#8A8278',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-up': 'fadeUp 1s ease-out forwards',
      },
      borderWidth: {
        DEFAULT: '0.5px', // default border rule
      },
      borderColor: {
        DEFAULT: '#C9A84C', // default gold border
      }
    },
  },
  plugins: [],
}
