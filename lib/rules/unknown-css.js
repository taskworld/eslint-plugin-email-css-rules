'use strict'

const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const supportMatrix = require('../assets/supportMatrix.json')
const reportToTarget = require('../utils/reportToTarget')

const map = require('lodash/map')
const isString = require('lodash/isString')
const keys = require('lodash/keys')
const uniq = require('lodash/uniq')
const compact = require('lodash/compact')
const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')
const elementType = require('jsx-ast-utils/elementType')

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
      const styles = extractStyle(node, require('lodash/kebabCase'))
      if (!hasPropStyle(node)) return
      if (isString(styles)) return

      const componentName = elementType(node)

      const keyStyles = keys(styles)
      const unknownCss = uniq(compact(map(keyStyles, (key) => !has(supportMatrix, key) ? key : null)))
      if (!isEmpty(unknownCss)) {
        context.report({
          node: reportToTarget(node),
          message: `Unknown style property \`${unknownCss.join(', ')}\` supplied to \`${componentName}\`.`
        })
      }
    },
  })
}
