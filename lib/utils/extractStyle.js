const getProp = require('jsx-ast-utils/getProp')
const getPropValue = require('jsx-ast-utils/getPropValue')

const map = require('lodash/map')
const fromPairs = require('lodash/fromPairs')

const extractStyle = (node, fnString) => {
  const cssStyles = getPropValue(getProp(node.attributes, 'style'))
  if (!fnString) return cssStyles
  return fromPairs(map(cssStyles, (value, style) => ([ fnString(style), value ])))
}
module.exports = extractStyle
