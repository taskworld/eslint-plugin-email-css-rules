'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const platforms = require('../config/platforms')
const supportMatrix = require('../assets/supportMatrix.json')
const reportToTarget = require('../utils/reportToTarget')

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
      const styles = extractStyle(node, require('lodash/kebabCase'))
      if (!hasPropStyle(node)) return
      if (isString(styles)) return

      const componentName = elementType(node)
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
          node: reportToTarget(node),
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
