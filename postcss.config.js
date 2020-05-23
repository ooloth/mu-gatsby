// Must remain a CommonJS file (not ESM or TS)

module.exports = {
  plugins: [require('tailwindcss')('./src/styles/tailwind.config.ts')],
}
