const hasPropStyle = require('../utils/hasPropStyle')

module.exports = (context) => ({
  JSXOpeningElement: (node) => {
    if (!hasPropStyle(node)) return
    context.report({ node, message: 'fooo' })
  }
})
