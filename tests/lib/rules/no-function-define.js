/**
 * @fileoverview Tests for `no-function-define` rule
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

eslintTester.addRuleTest("lib/rules/no-function-define", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.COMMONJS_1,
        fixtures.define.COMMONJS_2,
        fixtures.define.COMMONJS_3,
        fixtures.define.AMD,
        fixtures.define.AMD_EMPTY,
        fixtures.define.AMD_NAMED,
        fixtures.define.AMD_NAMED_EMPTY
    ],

    invalid: [
        {
            code: fixtures.define.FUNCTION,
            errors: [{
                message: "Simple function form of `define` is not allowed",
                type: "CallExpression"
            }]
        }
    ]

});
