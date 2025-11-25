/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: '#0b0b11',
        berry: '#422155',
        berryDeep: '#2a123b',
        lilac: '#5c4ed3',
        blush: '#d8cffc',
        neon: '#9b7df0',
      },
      boxShadow: {
        glow: '0 10px 60px rgba(124, 101, 214, 0.35)',
        glass: '0 15px 80px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        grain: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
        breathe: 'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 50, 104, 0.35)' },
          '50%': { boxShadow: '0 0 0 16px rgba(255, 50, 104, 0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
