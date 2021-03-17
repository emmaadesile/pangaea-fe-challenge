module.exports = {
  purge: {
    content: ['./src/**/*.js', './src/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pangaea-green-light': 'rgb(226,230,227)',
        'pangaea-green-dark': '#4b5648',
        'cart-bg': '#f2f3f0',
      },
      gridTemplateColumns: {
        '3cols': 'repeat(auto-fit, minmax(220px, 1fr))',
      },
      maxHeight: {
        '100': '35rem'
      },
      keyframes: {
        slideInMenu: {
          '0%': {
            transform: 'translate3d(100%, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0%, 0, 0)',
          },
        },
        moveIcon: {
          '0%': {
            transform: 'translateY(-5px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        slideInMenu: 'slideInMenu 0.6s cubic-bezier(1, 0, 0, 1) forwards',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
