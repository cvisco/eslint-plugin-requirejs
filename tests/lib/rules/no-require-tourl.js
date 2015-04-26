/**
 * @fileoverview Tests for `no-require-tourl` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("util"),
    eslint = require("eslint"),
    ESLintTester = require("eslint-tester"),
    fixtures = require("../../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var MESSAGE = "Use of `require.%s` is not allowed.";

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-require-tourl", {

    valid: [
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        {
            code: fixtures.REQUIRE_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIREJS_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIRE_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIREJS_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        }
    ]

});
