const { hasProp, getPropValue, elementType, getProp } = require('jsx-ast-utils')
const supportMatrix = require('../assets/supportMatrix.json')
const _ = require('lodash')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    const hasStyle = hasProp(node.attributes, 'style')
    if (!hasStyle) return

    const componentName = elementType(node)
    const styles = getPropValue(getProp(node.attributes, 'style'))
    const hasStrict = context.options[0] === 'strict'

    const unsupportedCSS = []
    const unknowCss = []
    for (const style in styles) {
      const css = _.kebabCase(style)
      const platforms = supportMatrix[css]
      if (hasStrict && _.isEmpty(platforms)) {
        unknowCss.push(css)
      }
      const hasUnsupported = _.some(_.values(platforms), (v) => {
        return _.isString(v) || v === false
      })
      if (hasUnsupported) {
        unsupportedCSS.push(css)
      }
    }
    if (unsupportedCSS.length > 0) {
      const thoseCss = _.join(unsupportedCSS, ', ')
      const message = `\`${thoseCss}\` supplied to \`${componentName}\` is unsupported.`
      context.report({
        node,
        message
      })
    }
    if (unknowCss.length > 0 && hasStrict) {
      context.report({
        node,
        message: `Unknown style property \`${_.join(unknowCss, ', ')}\` supplied to \`${componentName}\`.`
      })
    }
  },
})
