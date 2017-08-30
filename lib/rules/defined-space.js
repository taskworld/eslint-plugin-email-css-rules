'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')

const includes = require('lodash/includes')
const isString = require('lodash/isString')
const elementType = require('jsx-ast-utils/elementType')

module.exports = {
  meta: {
    docs: {
      description: 'restricted some HTML element should not support some css style.',
      category: 'Possible Errors',
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      const styles = extractStyle(node, require('lodash/kebabCase'))
      if (!hasPropStyle(node)) return
      if (isString(styles)) return

      const componentName = elementType(node)
      console.log(styles)
      // const styles = fromPairs(map(extractStyle(node), toTransformKebabCase))

      context.report({
        node,
        message: 'foo'
      })
    }
  })
}

function defineSpaceStyleSupported (css, componentName) {
  const unsupportTags = [ 'p', 'div' ]
  const cssCases = [ 'width', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left' ]
  if (!includes(unsupportTags, componentName)) return false
  return (includes(cssCases, css))
}
