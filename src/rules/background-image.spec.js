const rule = require('./background-image')
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
    { code: '<div style={{ background: "black" }}>foo</div>' }
  ],
  invalid: [
    {
      code: '<div style={{ background: "url(https://www.w3schools.com/css/gradient_bg.png)" }}>foo</div>',
      errors: [
        { message: '`background with image` supplied to `div` is unsupported.' },
      ],
    },
  ]
})
