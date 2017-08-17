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
        continue
      }
      const hadBackgroundImage = hasBackgroundImage(node)
      const hasUnsupported = _.some(_.values(platforms), (v) => {
        return (isUnsupportedTag(node) || hadBackgroundImage || v === false)
      })
      if (hasUnsupported) {
        const v = hadBackgroundImage ? 'background with image' : css
        unsupportedCSS.push(v)
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

function isUnsupportedTag (node) {
  const unsupportTags = [ 'p', 'div' ]
  const cssCases = [ 'width', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left' ]
  const el = elementType(node)
  const style = getPropValue(getProp(node.attributes, 'style'))
  if (_.indexOf(unsupportTags, el) === -1) return false

  const intersection = _.intersection(_.keys(style), cssCases)
  if (intersection.length === 0) return false
  return true
}

function hasBackgroundImage (node) {
  const backgroundCssValue = _.get(getPropValue(getProp(node.attributes, 'style')), 'background', false)
  if (!backgroundCssValue) return false
  if (backgroundCssValue.indexOf('url(') === -1) return false
  return true
}
