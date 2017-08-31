'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const reportToTarget = require('../utils/reportToTarget')

const includes = require('lodash/includes')
const isString = require('lodash/isString')
const isEmpty = require('lodash/isEmpty')
const _ = require('lodash')
const elementType = require('jsx-ast-utils/elementType')

const targetTags = [ 'p', 'div', 'a' ]
const styleCases = [ 'width', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft' ]

module.exports = {
  meta: {
    docs: {
      description: 'Restricted some HTML element should not support some css style.',
      category: 'Possible Errors',
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      const styles = extractStyle(node)
      if (!hasPropStyle(node)) return
      if (isString(styles)) return

      const componentName = elementType(node)
      if (!includes(targetTags, componentName)) return

      let unsupported = []
      for (const style in styles) {
        const matched = _.includes(styleCases, style)
        if (matched) {
          unsupported.push(style)
        }
      }

      if (!isEmpty(unsupported)) {
        context.report({
          node: reportToTarget(node),
          message: `\`${unsupported.join(', ')}\` supplied to \`${componentName}\` is not supported.`
        })
      }
    }
  })
}
