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
    { code: '<div style={{ direction: "ltr", fontFamily: "Tahoma", fontSize: "14px" }}>foo</div>' },
  ],

  invalid: [
    {
      code: '<div style={{ textShadow: "1px black" }}>foo</div>',
      errors: [
        { message: '`text-shadow` supplied to `div` is unsupported in: outlook, outlook-legacy, gmail.' },
      ],
    },
    {
      code: '<div style={{ textOverflow: "ellipsis" }}>foo</div>',
      error: [
        { message: '`text-overflow` supplied to `div` is unsupported in: outlook-web, yahoo-mail, gmail.' }
      ]
    },
    {
      code: '<div style={{ textOverflow: "ellipsis", textShadow: "1px black" }}>foo</div>',
      error: [
        { message: '`text-overflow`, `text-shadow` supplied to `div` is unsupported in: outlook-web, yahoo-mail, gmail, outlook, outlook-legacy.' }
      ]
    },
  ]
})
