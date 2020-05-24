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

const extend = { fontFamily }

/**
 * Theme (replacements)
 */

const screens = {
  iPhone6: '375px',
  sm: '36em',
  md: '48em',
  lg: '62em',
  xl: '75em',
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
  '7': '3rem',
  '8': '4rem',
  '9': '6rem',
  '10': '8rem',
  '11': '12rem',
  '12': '16rem',
  '13': '24rem',
  '14': '32rem',
  '15': '48rem',
  '16': '64rem',
  '17': '96rem',
}

const theme = { screens, spacing, extend }

/**
 * Variants
 */

const variants = {}

/**
 * Plugins
 */

const plugins: [] = []

export default { purge, theme, variants, plugins }
