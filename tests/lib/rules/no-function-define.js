/**
 * @fileoverview Tests for `no-function-define` rule
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

eslintTester.addRuleTest("lib/rules/no-function-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE
    ],

    invalid: [
        {
            code: fixtures.FUNCTION_DEFINE,
            errors: [{
                message: "Simple function form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
