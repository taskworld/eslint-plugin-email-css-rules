'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const supportMatrix = require('../assets/supportMatrix.json')

const kebabCase = require('lodash/kebabCase')
const fromPairs = require('lodash/fromPairs')
const map = require('lodash/map')
const keys = require('lodash/keys')
const uniq = require('lodash/uniq')
const compact = require('lodash/compact')
const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')
const elementType = require('jsx-ast-utils/elementType')

const toTransformKebabCase = (value, style) => ([ kebabCase(style), value ])

module.exports = {
  meta: {
    docs: {
      description: 'unknown css for email stylesheet',
      category: 'Possible Errors',
      recommended: true
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (!hasPropStyle(node)) return

      const componentName = elementType(node)
      const styles = fromPairs(map(extractStyle(node), toTransformKebabCase))
      const keyStyles = keys(styles)
      const unknownCss = uniq(compact(map(keyStyles, (key) => !has(supportMatrix, key) ? key : null)))

      if (!isEmpty(unknownCss)) {
        context.report({
          node,
          message: `Unknown style property \`${unknownCss.join(', ')}\` supplied to \`${componentName}\`.`
        })
      }
    }
  })
}
