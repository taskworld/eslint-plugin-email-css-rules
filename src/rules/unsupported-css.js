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
      const hadBackgroundImage = hasBackgroundImageSupported(node)
      const hadEllipsis = hasTextOverflowEllipsisSupported(node, platforms)
      const hasUnsupported = _.some(_.values(platforms), (v) => {
        return (
          isDefineSpaceStyleSupported(css, componentName) ||
          hadBackgroundImage ||
          hadEllipsis ||
          v === false
        )
      })
      if (hasUnsupported) {
        let v = css
        if (hadBackgroundImage) v = 'background with image'
        if (hadEllipsis) v = `text-overflow with ellipsis`
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

function isDefineSpaceStyleSupported (css, componentName) {
  const unsupportTags = [ 'p', 'div' ]
  const cssCases = [ 'width', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left' ]
  if (!_.includes(unsupportTags, componentName)) return false
  return (_.includes(cssCases, css))
}

function hasBackgroundImageSupported (node) {
  const backgroundCssValue = _.get(getPropValue(getProp(node.attributes, 'style')), 'background', false)
  if (!backgroundCssValue) return false
  if (backgroundCssValue.indexOf('url(') === -1) return false
  return true
}

function hasTextOverflowEllipsisSupported (node, platforms) {
  const unsupportEllipsisPlatforms = [ 'outlook-web', 'yahoo-mail', 'gmail' ]
  const unsupportValue = 'ellipsis'
  const textOverflowValue = _.get(getPropValue(getProp(node.attributes, 'style')), 'textOverflow', false)

  if (!textOverflowValue) return false
  if (textOverflowValue === unsupportValue) {
    return _.intersection(_.uniq(_.keys(platforms)), unsupportEllipsisPlatforms).length > 0
  }
}
