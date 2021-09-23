
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

      height: {
        '20r': '20rem',
        '40rem': '40rem',
        '30rem': '30rem',
        '50rem': '50rem',
        '45rem': '45rem',
        '47rem': '47rem'

      },

      width: {
        '40rem': '40rem',
        '30rem': '30rem',
        '50rem': '50rem'
      },

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
        'big': '12rem',
        'mid': '8rem',
        '6rem': '6rem',
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


        },

        '.project': {
          display: 'none'
        },

        '.project-trigger:hover~.project': {
          display: 'block',
        },


      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}
