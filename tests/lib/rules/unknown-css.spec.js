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
    { code: '<div style={{ borderRight: "20px" }}>foooo</div>' },
    { code: '<UserRow style={{ borderRight: "20px" }}>foooo</UserRow>' },
    { code: '<UserRow style={style.userRow}>foooo</UserRow>' },
  ],
  invalid: [
    {
      code: '<div style={{ unknowCSS: "black", barCss: "1px", borderRight: "20px" }}>foo</div>',
      errors: [
        { message: 'Unknown style property `unknow-css, bar-css` supplied to `div`.' },
      ],
    },
    {
      code: '<UserRow style={{ borderRight: "20px", kakaNana: "20px" }}>foooo</UserRow>',
      errors: [
        { message: 'Unknown style property `kaka-nana` supplied to `UserRow`.' },
      ],
    },
  ]
})
