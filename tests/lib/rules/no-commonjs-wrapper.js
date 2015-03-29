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
    fixtures = require("../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-commonjs-wrapper", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.FUNCTION,
        fixtures.define.AMD,
        fixtures.define.AMD_NAMED,
        fixtures.define.AMD_EMPTY,
        fixtures.define.AMD_NAMED_EMPTY
    ],

    invalid: [
        {
            code: fixtures.define.COMMONJS_1,
            errors: [{
                message: "Simplified CommonJS Wrapper form of `define` is not allowed",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.COMMONJS_2,
            errors: [{
                message: "Simplified CommonJS Wrapper form of `define` is not allowed",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.COMMONJS_3,
            errors: [{
                message: "Simplified CommonJS Wrapper form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
