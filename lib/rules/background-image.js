'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const platforms = require('../config/platforms')
const supportMatrix = require('../assets/supportMatrix.json')

const kebabCase = require('lodash/kebabCase')
const fromPairs = require('lodash/fromPairs')
const map = require('lodash/map')
const includes = require('lodash/includes')
const pick = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const isString = require('lodash/isString')
const isEmpty = require('lodash/isEmpty')
const keys = require('lodash/keys')
const uniq = require('lodash/uniq')
const values = require('lodash/values')
const toLower = require('lodash/toLower')
const concat = require('lodash/concat')
const get = require('lodash/get')
const elementType = require('jsx-ast-utils/elementType')
const getProp = require('jsx-ast-utils/getProp')
const toTransformKebabCase = (value, style) => ([ kebabCase(style), value ])

module.exports = {
  meta: {
    docs: {
      description: 'disallow use the background url image with some email platforms.',
      category: 'Possible Errors',
      recommended: true
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (!hasPropStyle(node)) return
      if (isString(extractStyle(node))) return

      const componentName = elementType(node)
      const styles = fromPairs(map(extractStyle(node), toTransformKebabCase))
      const configPlaforms = context.options[1] || platforms
      const hasUrlImage = detectBackgroundImageUrl(node)

      let unsupported = {}
      for (const style in styles) {
        if (!includes(style, 'background')) continue
        const platforms = pick(supportMatrix[style], configPlaforms)
        if (hasUrlImage) {
          unsupported = pickBy(platforms, isString)
        }
      }

      if (!isEmpty(unsupported)) {
        const platforms = keys(unsupported)
        const msg = uniq(values(unsupported))
        context.report({
          node: get(getProp(node.attributes, 'style'), 'value', node),
          message: `\`background with image url\` supplied to \`${componentName}\`, in ${concat(platforms)}: ${toLower(concat(msg))}.`
        })
      }
    }
  })
}

function detectBackgroundImageUrl (node) {
  const backgroundCssValue = get(extractStyle(node), 'background', false)
  return includes(backgroundCssValue, 'url(')
}
