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
    fixtures = require("../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);
var errorMessage = "Invalid form of `define`";

eslintTester.addRuleTest("lib/rules/no-invalid-define", {

    valid: [
        {
            code: fixtures.define.OBJECT,
            args: [2, { allowObject: true, allowFunction: false, allowCommonJS: false, allowAMD: false, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.FUNCTION,
            args: [2, { allowObject: false, allowFunction: true, allowCommonJS: false, allowAMD: false, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.COMMONJS_1,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: true, allowAMD: false, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.COMMONJS_2,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: true, allowAMD: false, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.COMMONJS_3,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: true, allowAMD: false, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.AMD,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: false, allowAMD: true, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.AMD_EMPTY,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: false, allowAMD: true, allowNamedAMD: false }]
        },
        {
            code: fixtures.define.AMD_NAMED,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: false, allowAMD: false, allowNamedAMD: true }]
        },
        {
            code: fixtures.define.AMD_NAMED_EMPTY,
            args: [2, { allowObject: false, allowFunction: false, allowCommonJS: false, allowAMD: false, allowNamedAMD: true }]
        }
    ],

    invalid: [
        {
            code: fixtures.define.EMPTY,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.NONSENSE,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.OBJECT,
            args: [2, { allowObject: false, allowFunction: true, allowCommonJS: true, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.FUNCTION,
            args: [2, { allowObject: true, allowFunction: false, allowCommonJS: true, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.COMMONJS_1,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: false, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.COMMONJS_2,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: false, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.COMMONJS_3,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: false, allowAMD: true, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: false, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD_EMPTY,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: false, allowNamedAMD: true }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD_NAMED,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: true, allowNamedAMD: false }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD_NAMED_EMPTY,
            args: [2, { allowObject: true, allowFunction: true, allowCommonJS: true, allowAMD: true, allowNamedAMD: false }],
            errors: [{
                message: errorMessage,
                type: "CallExpression"
            }]
        }
    ]

});
