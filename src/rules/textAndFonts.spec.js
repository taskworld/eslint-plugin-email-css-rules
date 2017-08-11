var rule = require("../../../lib/rules/custom-plugin-rule"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("custom-plugin-rule", rule, {
    valid: [
        "var validVariable = true",
    ],

    invalid: [
        {
            code: "var invalidVariable = true",
            errors: [ { message: "Unexpected invalid variable." } ]
        },
        {
            code: "var invalidVariable = true",
            errors: [ { message: /^Unexpected.+variable/ } ]
        }
    ]
});
