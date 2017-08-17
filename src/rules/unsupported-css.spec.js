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

ruleTester.run('text overflow with outlook platform', rule, {
  valid: [
    { code: `<td style={{ textOverflow: 'clip' }}>OH BOOM!!</td>`,
      options: ['strict', [ 'gmail' ]]
    },
  ],
  invalid: [
    { code: `<td style={{ textOverflow: 'clip' }}>OH BOOM!!</td>`,
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

ruleTester.run('width and padding with p and div tags.', rule, {
  valid: [
    {
      code: '<table style={{ width: "200px", padding: "1px 2px" }}>foo</table>',
      options: [ '', [
        'gmail',
        'gmail-android',
        'apple-mail',
        'apple-ios',
        'outlook'
      ] ]
    },
    {
      code: `class Mock extends React.Component {
        render () {
          return (
            <div>
              <table style={{ width: "600px" }}>
                <tr>
                  <td style={{ width: "330px", padding: "20px" }}>THIS IS WIDTH IN FIRST CELL, FIRST ROW.</td>
                  <td style={{ width: "200px" }}>SECOND CELL</td>
                </tr>
              </table>
            </div>
          )
        }
      }`,
      options: [ '', [
        'gmail',
        'gmail-android',
        'apple-mail',
        'apple-ios',
        'outlook'
      ] ]
    },
  ],
  invalid: [
    {
      code: '<div style={{ width: "200px", padding: "1px 2px" }}>foo</div>',
      options: [ '', [
        'gmail',
        'gmail-android',
        'apple-mail',
        'apple-ios',
        'outlook',
      ] ],
      errors: [ { message: '`width, padding` supplied to `div` is unsupported.' } ],
    },
    {
      code: '<p style={{ width: "200px", paddingLeft: "2px" }}>foo</p>',
      options: [ '', [
        'gmail',
        'gmail-android',
        'apple-mail',
        'apple-ios',
        'outlook',
      ] ],
      errors: [ { message: '`width, padding-left` supplied to `p` is unsupported.' } ],
    }
  ]
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
      code: '<div style={{ unknow: "black", barCss: "1px" }}>foo</div>',
      options: [ 'strict' ],
      errors: [
        { message: 'Unknown style property `unknow, bar-css` supplied to `div`.' },
      ],
    },
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
