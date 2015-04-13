/**
 * @fileoverview Tests for `no-commonjs-module-exports` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester"),
    fixtures = require("../../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-commonjs-module-exports", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.AMD_NAMED_DEFINE,
        fixtures.AMD_NAMED_EMPTY_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        {
            code: fixtures.CJS_WITH_MODULE_EXPORTS,
            errors: [{
                message: "Unexpected use of `module.exports` in module definition.",
                type: "AssignmentExpression"
            }]
        },
        {
            code: fixtures.CJS_WITH_FUNC_EXPR,
            errors: [{
                message: "Unexpected use of `module.exports` in module definition.",
                type: "AssignmentExpression"
            }]
        }
    ]

});
