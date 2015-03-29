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
    fixtures = require("../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-named-define", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.FUNCTION,
        fixtures.define.COMMONJS_1,
        fixtures.define.COMMONJS_2,
        fixtures.define.COMMONJS_3,
        fixtures.define.AMD,
        fixtures.define.AMD_EMPTY
    ],

    invalid: [
        {
            code: fixtures.define.AMD_NAMED,
            errors: [{
                message: "Named module form of `define` is not allowed",
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.define.AMD_NAMED_EMPTY,
            errors: [{
                message: "Named module form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
