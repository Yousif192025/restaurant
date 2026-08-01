/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['IBM Plex Sans Arabic', 'Tajawal', 'Alexandria', 'Cairo', 'sans-serif'],
      },
      colors: {
        'saudi-green': '#1a472a',
        'palm-green': '#2d6a4f',
        'sand-beige': '#d4b895',
        'warm-gold': '#c9a84c',
        'dark-brown': '#5c4033',
        'copper': '#b87333',
        'off-white': '#faf6f0',
      },
      borderRadius: {
        'saudi': '16px',
      },
      boxShadow: {
        'saudi': '0 4px 20px rgba(26, 71, 42, 0.1)',
        'saudi-hover': '0 8px 30px rgba(26, 71, 42, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
