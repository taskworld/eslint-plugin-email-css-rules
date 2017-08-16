const rule = require('./unsupported-css')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('unsupported-css', rule, {
  valid: [
    { code: '<div style={{ direction: "ltr", fontFamily: "Tahoma", fontSize: "14px" }}>foo</div>' },
    { code: '<div style={{ textAlign: "center" }}>foo</div>' },
  ],

  invalid: [
    {
      code: '<div style={{ textOverflow: "ellipsis", textShadow: "1px black" }}>foo</div>',
      errors: [
        { message: '`text-overflow, text-shadow` supplied to `div` is unsupported.' },
      ],
    },
    {
      code: '<div style={{ background: "black" }}>foo</div>',
      errors: [
        { message: '`background` supplied to `div` is unsupported.' },
      ],
    },
    {
      code: '<div style={{ backgroundSize: "black", borderTop: "1px" }}>foo</div>',
      errors: [
        { message: '`background-size` supplied to `div` is unsupported.' },
      ],
    },
  ]
})
