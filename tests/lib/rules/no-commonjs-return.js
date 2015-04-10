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
    fixtures = require("../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-commonjs-return", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.FUNCTION,
        fixtures.define.AMD,
        fixtures.define.AMD_EMPTY,
        fixtures.define.AMD_NAMED,
        fixtures.define.AMD_NAMED_EMPTY,
        fixtures.define.COMMONJS_2,
        fixtures.define.COMMONJS_3,
        fixtures.define.CJS_WITH_FUNC_EXPR
    ],

    invalid: [
        {
            code: fixtures.define.COMMONJS_1,
            errors: [{
                message: "Unexpected `return` in module definition. Use `exports` or `module.exports` instead.",
                type: "ReturnStatement"
            }]
        }
    ]

});
