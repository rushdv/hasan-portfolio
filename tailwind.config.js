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
        bg: {
          primary: '#08080a',
          surface: '#111116',
          card: '#16161d',
          cardHover: '#1c1c26',
        },
        accent: {
          amber: '#d4af37',
          gold: '#e5b869',
          warm: '#f59e0b',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
        text: {
          primary: '#f3f4f6',
          secondary: '#9ca3af',
          muted: '#6b7280',
        },
        border: {
          subtle: '#23232e',
          accent: 'rgba(212, 175, 55, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'Syne', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
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
        'dark-noise': 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
