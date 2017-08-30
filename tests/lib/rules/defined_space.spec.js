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
//
// ruleTester.run('width and padding with p and div tags.', rule, {
//   valid: [
//     {
//       code: '<table style={{ width: "200px", padding: "1px 2px" }}>foo</table>',
//     },
//     // {
//     //   code: `class Mock extends React.Component {
//     //     render () {
//     //       return (
//     //         <div>
//     //           <table style={{ width: "600px" }}>
//     //             <tr>
//     //               <td style={{ width: "330px", padding: "20px" }}>THIS IS WIDTH IN FIRST CELL, FIRST ROW.</td>
//     //               <td style={{ width: "200px" }}>SECOND CELL</td>
//     //             </tr>
//     //           </table>
//     //         </div>
//     //       )
//     //     }
//     //   }`,
//     // },
//   ],
//   invalid: [
//     // {
//     //   code: '<div style={{ width: "200px", padding: "1px 2px" }}>foo</div>',
//     //   errors: [ { message: '`width, padding` supplied to `div` is unsupported.' } ],
//     // },
//     // {
//     //   code: '<p style={{ width: "200px", paddingLeft: "2px" }}>foo</p>',
//     //   errors: [ { message: '`width, padding-left` supplied to `p` is unsupported.' } ],
//     // },
//     {
//       code: '<UserRow style={{ width: "250px", height: "30px", paddingLeft: "20px" }} data={data.rows} />',
//       errors: [ { message: 'Do not passing `style` property to Customize React Component directly.' } ]
//     }
//   ]
// })
