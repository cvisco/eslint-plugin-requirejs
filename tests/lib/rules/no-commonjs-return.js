/**
 * @fileoverview Tests for `no-commonjs-return` rule
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

eslintTester.addRuleTest("lib/rules/no-commonjs-return", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR
    ],

    invalid: [
        {
            code: fixtures.CJS_WITH_RETURN,
            errors: [{
                message: "Unexpected `return` in module definition.",
                type: "ReturnStatement"
            }]
        }
    ]

});
