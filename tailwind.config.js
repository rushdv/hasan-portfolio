/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0A0A09',
        charcoal: '#191817',
        warmPaper: '#F1EEE7',
        warmGray: '#B7B1A7',
        stone: '#76716A',
        accent: {
          DEFAULT: '#C7A66A',
          amber: '#C7A66A',
          gold: '#E5B869',
          warm: '#F59E0B',
          glow: 'rgba(199, 166, 106, 0.12)',
        },
        bg: {
          primary: '#0A0A09',
          surface: '#141413',
          card: '#1B1A19',
          cardHover: '#232220',
          paper: '#F1EEE7',
        },
        text: {
          primary: '#F1EEE7',
          secondary: '#B7B1A7',
          muted: '#76716A',
          dark: '#0A0A09',
        },
        border: {
          subtle: '#262523',
          accent: 'rgba(199, 166, 106, 0.3)',
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Space Grotesk', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dark-noise': 'radial-gradient(circle at 50% 50%, rgba(199, 166, 106, 0.04) 0%, transparent 65%)',
      }
    },
  },
  plugins: [],
}
