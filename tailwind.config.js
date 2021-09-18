
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {

  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      pointer: 'crosshair'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#181818',
          dark: '#E5E5DE'
        }
      },

      fontFamily: {
        'logotext': ['"Marck Script"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      },

      fontSize: {
        'big': '12rem'
      },



    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {

        '.cursor': {
          height: '1rem',
          width: '1rem',
          backgroundColor: 'black',
          borderRadius: '50%',
          position: 'absolute',
          transition: '60ms ease-out',


        },

        '.cursor::after': {
          content: '',
          position: 'absolute',
          width: '0',
          height: '0',
          borderLeft: '1rem solid transparent',
          borderRight: '1rem solid transparent',
          borderBottom: '2rem solid red',
          transform: 'rotate(-40deg)',
          top: '-8px',
          left: '-8px'


        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}
