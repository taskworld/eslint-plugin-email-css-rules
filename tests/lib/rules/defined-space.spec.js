const rule = require('../../../lib/rules/defined-space')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('width and padding with p and div tags.', rule, {
  valid: [
    {
      code: '<table style={{ width: "200px", padding: "1px 2px" }}>foo</table>',
    },
    { code: '<UserRow style={{ width: "250px", height: "30px", paddingLeft: "20px" }} data={data.rows} />' },
    { code: '<UserRow style={style.userRow} data={data.rows} />' },
    { code: '<UserRow data={this.props.dataType}>foooo</UserRow>' },
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
    },
  ],
  invalid: [
    {
      code: '<div style={{ width: "200px", padding: "1px 2px" }}>foo</div>',
      errors: [ { message: '`width, padding` supplied to `div` is not supported.' } ],
    },
    {
      code: '<p style={{ width: "200px", paddingLeft: "2px" }}>foo</p>',
      errors: [ { message: '`width, paddingLeft` supplied to `p` is not supported.' } ],
    },
    {
      code: '<a href="foo.com" style={{ paddingLeft: "2px", textAlign: "center" }}>foo</a>',
      errors: [ { message: '`paddingLeft` supplied to `a` is not supported.' } ],
    },
  ]
})
