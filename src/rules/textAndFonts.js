const hasProp = require('jsx-ast-utils/hasProp')
const _ = require('lodash')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    const style = hasProp(node.attributes, 'style')
    if (!_.isEmpty(style)) {
      context.report({
        node,
        message: 'no style idiot!!!'
      })
    }
  }
})
