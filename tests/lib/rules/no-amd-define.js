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

var ERROR = {
    message: "AMD form of `define` is not allowed.",
    type: "CallExpression"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-amd-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        { code: fixtures.AMD_DEFINE, errors: [ERROR] },
        { code: fixtures.AMD_EMPTY_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_AMD_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_AMD_EMPTY_DEFINE, errors: [ERROR] }
    ]

});
