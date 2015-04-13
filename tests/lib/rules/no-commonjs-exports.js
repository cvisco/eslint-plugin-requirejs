/**
 * @fileoverview Tests for `no-commonjs-exports` rule
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

eslintTester.addRuleTest("lib/rules/no-commonjs-exports", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        {
            code: fixtures.CJS_WITH_EXPORTS,
            errors: [{
                message: "Unexpected use of `exports` in module definition.",
                type: "AssignmentExpression"
            }]
        }
    ]

});
