import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'shadowBlack': 'rgba(0,0,0,.9)'
      },
      animation: {
        rainbowMy: 'rainbow 1.5s linear infinite',
        upDow: 'upDow 1.5s linear infinite'
      },
      keyframes: {
        rainbow: {
          '0%': {
            color: 'red'
          },
          '16%': {
            color: 'orange'
          },
          '32%': {
            color: 'yellow'
          },
          '48%': {
            color: 'green'
          },
          '64%': {
            color: 'blue'
          },
          '100%': {
            color: 'purple'
          }
        },
        upDow:  {
          '0%': {
              top: '10px'
          },
          '50%': {
            top: '-10px'
          },
          '100%': {
            top: '0'
          }
        }
      }
    },
  },
  plugins: [],
}
export default config
