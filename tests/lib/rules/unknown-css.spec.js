const rule = require('../../../lib/rules/unknown-css')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('unknow css', rule, {
  valid: [
    {
      code: '<div style={{ borderRight: "20px" }}>foooo</div>',
      options: [ 'strict' ],
    }
  ],
  invalid: [
    {
      code: '<div style={{ unknowCSS: "black", barCss: "1px", borderRight: "20px" }}>foo</div>',
      options: [ 'strict' ],
      errors: [
        { message: 'Unknown style property `unknow-css, bar-css` supplied to `div`.' },
      ],
    },
  ]
})
