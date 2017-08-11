const rule = require('../rules/textAndFonts')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()
ruleTester.run('custom-plugin-rule', rule, {
  valid: [
    'var validVariable = true',
  ],

  invalid: [
    {
      code: 'var invalidVariable = true',
      errors: [ { message: 'Unexpected invalid variable.' } ]
    },
    {
      code: 'var invalidVariable = true',
      errors: [ { message: /^Unexpected.+variable/ } ]
    }
  ]
})
