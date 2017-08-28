const getProp = require('jsx-ast-utils/getProp')
const getPropValue = require('jsx-ast-utils/getPropValue')

const extractStyle = (node) => getPropValue(getProp(node.attributes, 'style'))
module.exports = extractStyle
