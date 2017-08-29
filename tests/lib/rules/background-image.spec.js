const rule = require('../../../lib/rules/background-image')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('background css', rule, {
  valid: [
    { code: '<div style={{ background: "black", textAlign: "center" }}>foo</div>' }
  ],
  invalid: [
    {
      code: '<div style={{ background: "url(https://www.w3schools.com/css/gradient_bg.png)", textAlign: "center" }}>foo</div>',
      errors: [
        { message: '`background with image` supplied to `div` is unsupported.' },
      ],
    },
  ]
})
