/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        flipbounce: {
          '0%': { transform: 'rotateY(0deg) translateY(0)' },
          '25%': { transform: 'rotateY(90deg) translateY(-5px)' },
          '50%': { transform: 'rotateY(180deg) translateY(0)' },
          '75%': { transform: 'rotateY(270deg) translateY(-5px)' },
          '100%': { transform: 'rotateY(360deg) translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        scroll: 'scroll 20s linear infinite',
        flip: 'flip 1s ease-in-out',
        'flip-bounce': 'flipbounce 1.5s ease-in-out',
      },
      minWidth: {
        'card-sm': '220px',
        'card-md': '260px',
        'card-lg': '280px',
        'card-xl': '300px',
        'card-2xl': '320px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
};
