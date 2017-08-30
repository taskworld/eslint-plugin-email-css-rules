const rule = require('../../../lib/rules/unsupported-css')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('text overflow with outlook platform', rule, {
  valid: [
    { code: `<td style={{ textOverflow: 'clip' }}>OH BOOM!!</td>`,
      options: ['strict', [ 'gmail' ]]
    },
  ],
  invalid: [
    { code: `<td style={{ textOverflow: 'clip', width: '200px' }}>OH BOOM!!</td>`,
      options: ['strict', [ 'outlook', 'gmail', 'apple-ios' ]],
      errors: ['`text-overflow` supplied to `td` is unsupported.']
    }
  ]
})

ruleTester.run('text overflow with ellipsis value', rule, {
  valid: [
    { code: `<td style={{ textOverflow: 'clip' }}>OH BOOM!!</td>`,
      options: [ 'strict', [ 'apple-ios', 'apple-mail', 'gmail-android', 'apple-mail' ] ]
    },
  ],
  invalid: [
    {
      code: `<table><tr><td style={{ textOverflow: 'ellipsis' }}>EL DOT DOT DOT</td></tr></table>`,
      options: [ 'strict', [ 'outlook-web', 'yahoo-mail', 'gmail', 'outlook', 'gmail-android', 'apple-ios' ] ],
      errors: [ '`text-overflow with ellipsis` supplied to `td` is unsupported.' ]
    }
  ]
})

ruleTester.run('absolutely not support in all platforms.', rule, {
  valid: [
    { code: '<div style={{ direction: "ltr", fontFamily: "Tahoma", fontSize: "14px" }}>foo</div>' },
    { code: `const MockModal = React.createClass({
      render () {
        return (
          <div style={{ textAlign: "center" }}>
            <table style={{ textAlign: "left" }}><tr><td>WHAOOO!!! THE LEFT</td></tr></table>
          </div>
        )
      }
    })` },
    { code: `class MockModal extends React.Component {
      render () {
        return (<div style={{ textAlign: "center" }}>fooooo</div>)
      }
    }` },
  ],
  invalid: [
    {
      code: '<div style={{ textShadow: "1px black" }}>foo</div>',
      errors: [
        { message: '`text-shadow` supplied to `div` is unsupported.' },
      ],
    },
    {
      code: '<div style={{ backgroundSize: "black", borderTop: "1px" }}>foo</div>',
      errors: [
        { message: '`background-size` supplied to `div` is unsupported.' },
      ],
    },
    {
      code: `class MockModal extends React.Component {
        render () {
          return (<div style={{ textShadow: "center" }}>fooooo</div>)
        }
      }`,
      errors: [
        { message: '`text-shadow` supplied to `div` is unsupported.' },
      ],
    },
  ]
})
