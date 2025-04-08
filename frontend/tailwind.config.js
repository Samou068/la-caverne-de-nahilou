module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'cave-purple': '#6B46C1',
        'cave-blue': '#3182CE',
        'cave-green': '#38A169',
        'cave-yellow': '#ECC94B',
        'cave-orange': '#DD6B20',
        'cave-red': '#E53E3E',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Fredoka One', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
