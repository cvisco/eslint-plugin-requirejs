/**
 * @fileoverview Tests for `no-multiple-define` rule
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

eslintTester.addRuleTest("lib/rules/no-multiple-define", {

    valid: [
        fixtures.define.OBJECT,
        fixtures.define.FUNCTION,
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
            code: fixtures.define.MULTIPLE,
            errors: [{
                message: "Multiple `define` calls in a single file are not permitted",
                type: "Program"
            }]
        }
    ]

});
