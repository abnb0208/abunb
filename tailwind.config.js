/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          dark: '#005cc5',
          light: '#3291ff',
        },
        secondary: {
          DEFAULT: '#7928ca',
          dark: '#6017a9',
          light: '#8a3fd1',
        },
        dark: {
          DEFAULT: '#111111',
          lighter: '#333333',
        },
        tech: {
          blue: '#00f2fe',
          purple: '#4facfe',
          green: '#00f2c3',
          red: '#ff0080',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(0, 242, 254, 0.5)',
        'glow-purple': '0 0 15px rgba(121, 40, 202, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #7928CA 0%, #FF0080 100%)',
      },
    },
  },
  plugins: [],
}; 