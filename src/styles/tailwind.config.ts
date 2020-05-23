// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = ['./src/**/*.tsx', './src/**/*.jsx']

const extend = {}

const theme = { extend }

const variants = {}

const plugins: [] = []

export default { purge, theme, variants, plugins }
