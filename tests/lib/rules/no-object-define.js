/**
 * @fileoverview Tests for `no-object-define` rule
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

eslintTester.addRuleTest("lib/rules/no-object-define", {

    valid: [
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.AMD_NAMED_DEFINE,
        fixtures.AMD_NAMED_EMPTY_DEFINE
    ],

    invalid: [
        {
            code: fixtures.OBJECT_DEFINE,
            errors: [{
                message: "Simple Name/Value Pairs form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
