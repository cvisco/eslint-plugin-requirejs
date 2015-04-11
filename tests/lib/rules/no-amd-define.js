/**
 * @fileoverview Tests for `no-amd-define` rule
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

eslintTester.addRuleTest("lib/rules/no-amd-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_NAMED_DEFINE,
        fixtures.AMD_NAMED_EMPTY_DEFINE
    ],

    invalid: [
        {
            code: fixtures.AMD_DEFINE,
            errors: [{
                message: "AMD form of `define` is not allowed",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.AMD_EMPTY_DEFINE,
            errors: [{
                message: "AMD form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
