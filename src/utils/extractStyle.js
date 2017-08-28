const { getPropValue, getProp } = require('jsx-ast-utils')
const extractStyle = (node) => getPropValue(getProp(node.attributes, 'style'))
module.exports = extractStyle
