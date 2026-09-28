/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './data/**/*.{js,jsx,ts,tsx,mdx}',
    './lib/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ---- Core luxury palette: warm ivory, cream, charcoal, muted gold ----
        ivory: {
          DEFAULT: '#FCFAF6',
          soft: '#F7F2E9',
          deep: '#F2EADA',
        },
        cream: {
          DEFAULT: '#F6F0E4',
          soft: '#EFE6D6',
          deep: '#E7DBC6',
        },
        sand: {
          DEFAULT: '#DCCDB2',
          soft: '#EADFCB',
        },
        line: {
          DEFAULT: '#E4DAC8',
          soft: '#EFE8DC',
          strong: '#D3C5AC',
        },
        charcoal: {
          DEFAULT: '#1B1A17',
          soft: '#2A2823',
          mute: '#3B382F',
        },
        ink: {
          DEFAULT: '#26241F',
          soft: '#5B554B',
          mute: '#857E72',
        },
        gold: {
          DEFAULT: '#B08A4A',
          soft: '#C9A868',
          pale: '#E3D2AE',
        },
        // Deep accent used sparingly (footer / admin chrome / CTA bands)
        espresso: '#221F1A',
      },
      fontFamily: {
        // Elegant serif headings
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // Clean modern sans body
        sans: ['var(--font-sans)', 'Segoe UI', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27, 26, 23, 0.04), 0 12px 32px -18px rgba(27, 26, 23, 0.22)',
        'card-hover':
          '0 1px 2px rgba(27, 26, 23, 0.05), 0 22px 46px -22px rgba(27, 26, 23, 0.28)',
        panel: '0 24px 60px -34px rgba(27, 26, 23, 0.35)',
        focus: '0 0 0 3px rgba(176, 138, 74, 0.28)',
      },
      borderRadius: {
        // Subtle, never pill-shaped
        xs: '3px',
        sm: '5px',
        DEFAULT: '7px',
        md: '9px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
