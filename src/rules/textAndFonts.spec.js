const rule = require('../rules/textAndFonts')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('text-and-font', rule, {
  valid: [
    { code: '<div style={{ direction: "ltr" }}>foo</div>' },
  ],

  invalid: [
    {
      code: '<div style={{ textShadow: "1px black" }}>foo</div>',
      errors: [ { message: 'Style property text-shadow supplied to div is unsupported in Gmail.' } ],
    },
  ]
})
