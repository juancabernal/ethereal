/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: '#0b0b11',
        berry: '#3f2a60',
        berryDeep: '#221532',
        lilac: '#7d6bdb',
        blush: '#e7e1ff',
        neon: '#a772ff',
      },
      boxShadow: {
        glow: '0 10px 60px rgba(167, 114, 255, 0.25)',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(167, 114, 255, 0.35)' },
          '50%': { boxShadow: '0 0 0 16px rgba(167, 114, 255, 0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
    fontFamily: {
      sans: ['"Inter Tight"', 'Space Grotesk', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
