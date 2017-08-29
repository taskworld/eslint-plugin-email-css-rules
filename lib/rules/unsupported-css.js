'use strict'

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
const isString = require('lodash/isString')
const elementType = require('jsx-ast-utils/elementType')
const getProp = require('jsx-ast-utils/getProp')

const supportMatrix = require('../assets/supportMatrix.json')
const extractStyle = require('../utils/extractStyle')
const report = require('../utils/report')
const hasPropStyle = require('../utils/hasPropStyle')
const platforms = require('../config/platforms')

module.exports = {
  meta: {
    docs: {
      description: 'Not allowed unsupported css styles with email platforms isn\'t supported.',
      category: 'Possible Errors',
      recommended: true
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (!hasPropStyle(node)) return
      if (isString(extractStyle(node))) return

      const componentName = elementType(node)
      const styles = extractStyle(node)
      const unsupportedCSS = []
      const configPlaforms = context.options[1] || platforms

      for (const style in styles) {
        const css = kebabCase(style)
        const platforms = pick(supportMatrix[css], configPlaforms)
        const hadEllipsis = hasTextOverflowEllipsisSupported(node, platforms)
        const hasUnsupported = some(values(platforms), (v) => {
          return (
            isDefineSpaceStyleSupported(css, componentName) ||
            hadEllipsis ||
            v === false
          )
        })
        if (hasUnsupported) {
          let noticeCss = css
          if (hadEllipsis) noticeCss = `text-overflow with ellipsis`
          unsupportedCSS.push(noticeCss)
        }
      }
      if (!isEmpty(unsupportedCSS)) {
        report(unsupportedCSS, componentName, false, context, get(getProp(node.attributes, 'style'), 'value', node))
      }
    },
  })
}

function isDefineSpaceStyleSupported (css, componentName) {
  const unsupportTags = [ 'p', 'div' ]
  const cssCases = [ 'width', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left' ]
  if (!includes(unsupportTags, componentName)) return false
  return (includes(cssCases, css))
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
