
const elementType = require('jsx-ast-utils/elementType')
const kebabCase = require('lodash/kebabCase')
const pick = require('lodash/pick')
const isEmpty = require('lodash/isEmpty')
const some = require('lodash/some')
const values = require('lodash/values')
const includes = require('lodash/includes')
const get = require('lodash/get')
const intersection = require('lodash/intersection')
const uniq = require('lodash/uniq')
const keys = require('lodash/keys')

const supportMatrix = require('../assets/supportMatrix.json')
const extractStyle = require('../utils/extractStyle')
const report = require('../utils/report')
const hasPropStyle = require('../utils/hasPropStyle')
const platforms = require('../config/platforms')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    if (!hasPropStyle(node)) return

    const componentName = elementType(node)
    const styles = extractStyle(node)
    const hasStrict = context.options[0] === 'strict'
    const unsupportedCSS = []
    const unknowCss = []
    const configPlaforms = context.options[1] || platforms

    for (const style in styles) {
      const css = kebabCase(style)
      const platforms = pick(supportMatrix[css], configPlaforms)
      if (hasStrict && isEmpty(platforms)) {
        unknowCss.push(css)
        continue
      }
      const hadBackgroundImage = hasBackgroundImageSupported(node)
      const hadEllipsis = hasTextOverflowEllipsisSupported(node, platforms)
      const hasUnsupported = some(values(platforms), (v) => {
        return (
          isDefineSpaceStyleSupported(css, componentName) ||
          hadBackgroundImage ||
          hadEllipsis ||
          v === false
        )
      })
      if (hasUnsupported) {
        let noticeCss = css
        if (hadBackgroundImage) noticeCss = 'background with image'
        if (hadEllipsis) noticeCss = `text-overflow with ellipsis`
        unsupportedCSS.push(noticeCss)
      }
    }
    if (!isEmpty(unsupportedCSS)) {
      report(unsupportedCSS, componentName, false, context, node)
    }
    if (!isEmpty(unknowCss) > 0 && hasStrict) {
      report(unknowCss, componentName, true, context, node)
    }
  },
})

function isDefineSpaceStyleSupported (css, componentName) {
  const unsupportTags = [ 'p', 'div' ]
  const cssCases = [ 'width', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left' ]
  if (!includes(unsupportTags, componentName)) return false
  return (includes(cssCases, css))
}

function hasBackgroundImageSupported (node) {
  const backgroundCssValue = get(extractStyle(node), 'background', false)
  if (!backgroundCssValue) return false
  if (!includes(backgroundCssValue, 'url(')) return false
  return true
}

function hasTextOverflowEllipsisSupported (node, platforms) {
  const unsupportEllipsisPlatforms = [ 'outlook-web', 'yahoo-mail', 'gmail' ]
  const unsupportValue = 'ellipsis'
  const textOverflowValue = get(extractStyle(node), 'textOverflow', false)

  if (!textOverflowValue) return false
  if (textOverflowValue === unsupportValue) {
    return intersection(uniq(keys(platforms)), unsupportEllipsisPlatforms).length > 0
  }
}
