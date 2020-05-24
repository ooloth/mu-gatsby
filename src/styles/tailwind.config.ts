// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = ['./src/**/*.tsx', './src/**/*.jsx']

const screens = {
  iPhone6: '375px',
  sm: '36em',
  md: '48em',
  lg: '62em',
  xl: '75em',
}

const extend = {}

const theme = { screens, extend }

const variants = {}

const plugins: [] = []

export default { purge, theme, variants, plugins }
