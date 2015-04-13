/**
 * @fileoverview Tests for `no-invalid-define` rule
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

eslintTester.addRuleTest("lib/rules/no-invalid-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
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
            code: fixtures.EMPTY_DEFINE,
            errors: [{
                message: "Invalid module definition",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.BAD_DEFINE,
            errors: [{
                message: "Invalid module definition",
                type: "CallExpression"
            }]
        }
    ]

});
