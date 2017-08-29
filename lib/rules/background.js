const hasPropStyle = require('../utils/hasPropStyle')
const extractStyle = require('../utils/extractStyle')
const platforms = require('../config/platforms')
const supportMatrix = require('../assets/supportMatrix.json')

const _ = require('lodash')
const toTransformKebabCase = (value, style) => ([ _.kebabCase(style), value ])

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    if (!hasPropStyle(node)) return

    const styles = _.fromPairs(_.map(extractStyle(node), toTransformKebabCase))
    const configPlaforms = context.options[1] || platforms

    for (const style in styles) {
      const platforms = _.pick(supportMatrix[style], configPlaforms)
      console.log(_.filter(platforms, _.isString))
    }

    context.report({ node, message: 'fooo' })
  }
})
