const defaultTheme = require('tailwindcss/defaultTheme')

// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.jsx', './src/**/*.js']

/**
 * Theme (extensions)
 */

const fontFamily = {
  sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
}

const screens = {
  iPhone6: '375px',
  ...defaultTheme.screens,
}

const extend = { fontFamily, screens }

/**
 * Theme (replacements)
 */

const borderWidth = {
  '0': '0',
  '1': '1px',
  '2': '2px',
  '3': '3px',
  '4': '4px',
  '5': '6px',
  '6': '8px',
}

const spacing = {
  '0': '0rem',
  px: '1px',
  '1': '.25rem',
  '2': '.5rem',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.5rem',
  '6': '2rem',
  '7': '2.5rem',
  '8': '3rem',
  '9': '4rem',
  '10': '5rem',
  '11': '6rem',
  '12': '8rem',
  '13': '10rem',
  '14': '12rem',
  '15': '14rem',
  '16': '16rem',
}

const theme = { borderWidth, extend, spacing }

/**
 * Variants
 */

const variants = {}

/**
 * Plugins
 */

const plugins: [] = []

export default { purge, theme, variants, plugins }
