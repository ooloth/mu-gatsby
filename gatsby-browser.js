const React = require('react')
const { StrictMode } = require('react')

exports.wrapRootElement = ({ element }) => {
  return <StrictMode>{element}</StrictMode>
}
