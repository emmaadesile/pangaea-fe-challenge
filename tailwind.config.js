module.exports = {
  purge: {
    content: ['./src/**/*.js', './src/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pangaea-green': '#acaca4',
        'pangaea-green-dark': '#6c7c6c',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
