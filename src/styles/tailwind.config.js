// Must remain a CommonJS file (not ESM or TS)

const defaultTheme = require('tailwindcss/defaultTheme')

// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = [
  './src/**/*.js',
  './src/**/*.jsx',
  './src/**/*.ts',
  './src/**/*.tsx',
  './plugins/**/*.ts',
]

/**
 * Theme (extensions)
 */

const colors = {
  purple: {
    ...defaultTheme.colors.purple,
    /* Contrast with white text = 4.58: */
    default: 'hsl(267, 85%, 62%)',
    /* Contrast with white text = 4.84: */
    light: 'hsla(267, 85%, 62%, 90%)',
  },
}

const fontFamily = {
  sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
}

const fontSize = {
  '7xl': '5rem',
  '8xl': '6rem',
}

const height = {
  '1em': '1em',
}

const lineHeight = {
  '0': '0',
}

const screens = {
  iPhoneX: '375px',
}

const width = {
  '1em': '1em',
}

const zIndex = {
  '100': '100',
}

const extend = {
  colors,
  fontFamily,
  fontSize,
  height,
  lineHeight,
  screens,
  width,
  zIndex,
}

/**
 * Theme (replacements)
 */

const theme = { extend }

/**
 * Variants
 */

const variants = {}

/**
 * Plugins
 */

const plugins = []

module.exports = { purge, theme, variants, plugins }
