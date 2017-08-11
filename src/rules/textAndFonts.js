const { hasProp, getPropValue, elementType, getProp, propName } = require('jsx-ast-utils')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    const hasStyle = hasProp(node.attributes, 'style')
    if (hasStyle) {
      const element = elementType(node)
      const prop = propName(getProp(node.attributes, 'style'))
      const propValue = getPropValue(getProp(node.attributes, 'style'))
      console.log(element, prop, propValue)
      context.report({
        node,
        message: 'fuck'
      })
      // getProp(node.attributes, 'style')
    }
  },
})
