const { hasProp, getPropValue, elementType, getProp } = require('jsx-ast-utils')
const supportMatrix = require('../assets/supportMatrix.json')
const _ = require('lodash')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    const hasStyle = hasProp(node.attributes, 'style')
    if (!hasStyle) return

    const componentName = elementType(node)
    const styles = getPropValue(getProp(node.attributes, 'style'))

    const unsupportedCSS = []
    for (const style in styles) {
      const css = _.kebabCase(style)
      const supportPlatforms = supportMatrix[css]
      const hasUnsupported = _.some(_.values(supportPlatforms), (v) => {
        return _.isString(v) || v === false
      })
      if (hasUnsupported) {
        unsupportedCSS.push(css)
      }
    }
    if (unsupportedCSS.length > 0) {
      context.report({
        node,
        message: `\`${_.join(unsupportedCSS, ', ')}\` supplied to \`${componentName}\` is unsupported.`
      })
    }
  },
})
