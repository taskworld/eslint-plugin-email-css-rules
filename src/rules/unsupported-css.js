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
    const configPlaforms = context.options[1] || [
      'gmail',
      'gmail-android',
      'apple-mail',
      'apple-ios',
      'yahoo-mail',
      'outlook',
      'outlook-legacy',
      'outlook-web',
    ]

    const unsupportedCSS = []
    const unknowCss = []
    for (const style in styles) {
      const css = _.kebabCase(style)
      const platforms = _.pick(supportMatrix[css], configPlaforms)
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
      report(unsupportedCSS, componentName, false, context, node)
    }
    if (unknowCss.length > 0 && hasStrict) {
      report(unknowCss, componentName, true, context, node)
    }
  },
})

function report (noticedCss = [], componentName, hasStrict, context, node) {
  const thoseCss = _.join(noticedCss, ', ')
  const message = (hasStrict)
    ? `Unknown style property \`${thoseCss}\` supplied to \`${componentName}\`.`
    : `\`${thoseCss}\` supplied to \`${componentName}\` is unsupported.`

  context.report({
    node,
    message
  })
}
