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
    fixtures = require("../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-amd-define", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.FUNCTION,
        fixtures.define.COMMONJS_1,
        fixtures.define.COMMONJS_2,
        fixtures.define.COMMONJS_3,
        fixtures.define.AMD_NAMED,
        fixtures.define.AMD_NAMED_EMPTY
    ],

    invalid: [
        {
            code: fixtures.define.AMD,
            errors: [{
                message: "AMD form of `define` is not allowed",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD_EMPTY,
            errors: [{
                message: "AMD form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
