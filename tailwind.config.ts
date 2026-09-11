import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        steel: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          850: '#162436',
          900: '#101B2B',
          950: '#0B1118',
        },
        emergency: {
          400: '#FF5A43',
          500: '#E63920',
          600: '#C92A14',
          700: '#9E1D0B',
        },
        caution: {
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
        },
        safety: {
          400: '#34D399',
          500: '#059669',
          600: '#047857',
        },
        brand: {
          orange: '#FF5C00',
          'orange-dark': '#E05200',
          'orange-light': '#FF7A29',
          navy: '#0C121E',
          'navy-dark': '#070B13',
          'navy-light': '#141E32',
          steel: '#5A5A5E',
        },
        surface: {
          0: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-primary)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'fluid-display': ['clamp(2.25rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'fluid-h1': ['clamp(1.85rem, 3.5vw + 0.8rem, 3.25rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        'fluid-h2': ['clamp(1.45rem, 2.5vw + 0.6rem, 2.25rem)', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        'fluid-h3': ['clamp(1.2rem, 1.8vw + 0.4rem, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'fluid-h4': ['clamp(1.05rem, 1.2vw + 0.3rem, 1.35rem)', { lineHeight: '1.4', letterSpacing: '0.00em', fontWeight: '600' }],
        'display-1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        h1: ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        h2: ['2.0rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.00em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.00em', fontWeight: '400' }],
        'body-base': ['1.0rem', { lineHeight: '1.6', letterSpacing: '0.00em', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
        badge: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '2px', // Precision chamfer
        DEFAULT: '4px', // Machined card edge
        md: '6px', // Maximum structural radius
      },
      boxShadow: {
        'bevel-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        milled: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        'machined-card': '0 4px 6px -1px rgba(11, 17, 24, 0.12), 0 0 0 1px rgba(11, 17, 24, 0.05)',
        'dark-glow': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
