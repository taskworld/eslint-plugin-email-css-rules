/**
 * @fileoverview Css rule for email style
 * @author email-css-rules
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var requireIndex = require('requireindex')

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

// import all rules in lib/rules
console.log(requireIndex(`${__dirname}/rules`))
module.exports.rules = requireIndex(`${__dirname}/rules`)
