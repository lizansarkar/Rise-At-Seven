import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(2rem, 12vw, 20rem)',
        'lg-text': 'clamp(1.5rem, 8vw, 12rem)',
      },
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        riseTheme: {
          primary: '#b2f6e3',
          secondary: '#111212',
          accent: '#b2f6e3',
          neutral: '#efeeec',
          'base-100': '#efeeec',
          'base-200': '#e8e6e4',
          'base-300': '#e0ded9',
          info: '#b2f6e3',
          success: '#b2f6e3',
          warning: '#111212',
          error: '#111212',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.375rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
        },
      },
    ],
    darkTheme: 'riseTheme',
  },
};
