/**
 * @fileoverview Tests for `no-named-define` rule
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
    message: "Named module form of `define` is not allowed",
    type: "CallExpression"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-named-define", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE
    ],

    invalid: [
        { code: fixtures.NAMED_OBJECT_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_FUNCTION_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_AMD_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_AMD_EMPTY_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE, errors: [ERROR] }
    ]

});
