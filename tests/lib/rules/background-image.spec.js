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
    { code: '<div style={{ background: "black", textAlign: "center" }}>foo</div>' },
    { code: '<table><tr style={{ background: "transparent" }}>foo</tr></table>' },
  ],
  invalid: [
    {
      code: '<div style={{ background: "url(https://www.w3schools.com/css/gradient_bg.png)", textAlign: "center" }}>foo</div>',
      errors: [
        { message: '`background with image url` supplied to `div`, in outlook,outlook-web: background images not supported.' },
      ],
    },
  ]
})
