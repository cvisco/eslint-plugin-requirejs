/**
 * @fileoverview Tests for `no-multiple-define` rule
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

eslintTester.addRuleTest("lib/rules/no-multiple-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
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
            code: fixtures.MULTIPLE_DEFINE,
            errors: [{
                message: "Multiple `define` calls in a single file are not permitted",
                type: "Program"
            }]
        }
    ]

});
