/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4A574', // Warm Gold
        secondary: '#FEF7E6', // Soft Warm Background
        accent: '#C79B3A', // Rich Gold/Bronze
        dark: '#1a1a2e', // Dark Blue-Gray (unchanged)
        light: '#f8f9fa', // Off-white
        gold: '#D4A574',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #f5e6e8 0%, #fff5f7 100%)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in',
        'slideUp': 'slideUp 0.8s ease-out',
        'slideDown': 'slideDown 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(199, 162, 82, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(199, 162, 82, 0.45)' },
        },
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'glow-gold': '0 0 30px rgba(199, 162, 82, 0.4)',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};