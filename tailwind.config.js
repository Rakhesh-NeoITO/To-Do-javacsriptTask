/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      const extendUnderline = {
          '.line-through': {
              'textDecoration': 'line-through',
              'text-decoration-color': 'black',
              'text-decoration-thickness' : '4px'
          },
      }
      addUtilities(extendUnderline)
  }
  ],
}