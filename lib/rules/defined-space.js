'use_strict'

module.exports = {
  meta: {
    docs: {
      description: 'restricted some HTML element should not support some css style.',
      category: 'Possible Errors',
    }
  },
  create: (context) => ({
    JSXOpeningElement: (node) => {
      context.report({
        node,
        message: 'foo'
      })
    }
  })
}
