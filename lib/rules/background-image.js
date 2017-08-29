'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const platforms = require('../config/platforms')
const supportMatrix = require('../assets/supportMatrix.json')

const _ = require('lodash')
const elementType = require('jsx-ast-utils/elementType')
const toTransformKebabCase = (value, style) => ([ _.kebabCase(style), value ])

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

      const componentName = elementType(node)
      const styles = _.fromPairs(_.map(extractStyle(node), toTransformKebabCase))
      const configPlaforms = context.options[1] || platforms
      const hasUrlImage = detectBackgroundImageUrl(node)

      let unsupported = {}
      for (const style in styles) {
        if (!_.includes(style, 'background')) continue
        const platforms = _.pick(supportMatrix[style], configPlaforms)
        if (hasUrlImage) {
          unsupported = _.pickBy(platforms, _.isString)
        }
      }

      if (!_.isEmpty(unsupported)) {
        const platforms = _.keys(unsupported)
        const msg = _.uniq(_.values(unsupported))
        context.report({
          node,
          message: `\`background with image url\` supplied to \`${componentName}\`, in ${_.concat(platforms)}: ${_.toLower(_.concat(msg))}.`
        })
      }
    }
  })
}

function detectBackgroundImageUrl (node) {
  const backgroundCssValue = _.get(extractStyle(node), 'background', false)
  return _.includes(backgroundCssValue, 'url(')
}
