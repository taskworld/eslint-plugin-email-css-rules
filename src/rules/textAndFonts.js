const { hasProp, getPropValue, elementType, getProp, propName } = require('jsx-ast-utils')
const supportMatrix = require('../assets/supportMatrix.json')
const _ = require('lodash')

const platforms = [
  'gmail',
  'gmail-android',
  'apple-mail',
  'apple-ios',
  'yahoo-mail',
  'outlook',
  'outlook-legacy',
  'outlook-web',
]

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    const hasStyle = hasProp(node.attributes, 'style')
    if (!hasStyle) return

    const componentName = elementType(node)
    const styles = getPropValue(getProp(node.attributes, 'style'))

    for (const style in styles) {
      const unsupported = []
      const warningMessages = []
      const propName = _.kebabCase(style)
      const supportInfo = supportMatrix[propName]

      for (const platform of platforms) {
        // if (typeof supportInfo[platform] === 'string') {
        //   warningMessages.push(platform)
        // }
        if (!supportInfo[platform]) {
          unsupported.push(platform)
        }
      }
      // if (warningMessages.length > 0) {
      //   context.report({
      //     node,
      //     message: `Warning: Style property \`${propName}\` supplied to \`${componentName}\`, in ${platforms.join(', ')}: ${msg.toLowerCase()}`
      //   })
      // }

      if (unsupported.length > 0) {
        context.report({
          node,
          message: `Style property \`${propName}\` supplied to \`${componentName}\` unsupported in: ${unsupported.join(', ')}.`
        })
      }
    }
  },
})
