const join = require('lodash/join')

function report (noticedCss = [], componentName, hasStrict, context, node) {
  const thoseCss = join(noticedCss, ', ')
  const message = (hasStrict)
    ? `Unknown style property \`${thoseCss}\` supplied to \`${componentName}\`.`
    : `\`${thoseCss}\` supplied to \`${componentName}\` is unsupported.`

  context.report({
    node,
    message
  })
}

module.exports = report
