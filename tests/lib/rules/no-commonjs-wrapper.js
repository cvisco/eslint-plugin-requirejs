/**
 * @fileoverview Tests for `no-commonjs-wrapper` rule
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
    message: "Simplified CommonJS Wrapper form of `define` is not allowed",
    type: "CallExpression"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-commonjs-wrapper", {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE
    ],

    invalid: [
        { code: fixtures.CJS_WITH_RETURN, errors: [ERROR] },
        { code: fixtures.CJS_WITH_EXPORTS, errors: [ERROR] },
        { code: fixtures.CJS_WITH_MODULE_EXPORTS, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE, errors: [ERROR] }
    ]

});
