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

const theme = { screens, extend }

/**
 * Variants
 */

const variants = {}

/**
 * Plugins
 */

const plugins: [] = []

export default { purge, theme, variants, plugins }
