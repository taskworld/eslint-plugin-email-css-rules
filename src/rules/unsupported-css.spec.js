const rule = require('./unsupported-css')
const RuleTester = require('eslint').RuleTester
const _ = require('lodash')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

const commonInvalidCases = [
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

ruleTester.run('unsupported-with-warning-sentense', rule, {
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
    }
  ]
})

ruleTester.run('unknow-css', rule, {
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

ruleTester.run('unsupported-css', rule, {
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
  invalid: commonInvalidCases
})
