const hasProp = require('jsx-ast-utils/hasProp')

const hasPropStyle = (node) => hasProp(node.attributes, 'style')

module.exports = hasPropStyle
