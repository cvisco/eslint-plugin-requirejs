/**
 * @fileoverview Tests for `no-assign-exports` rule
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

eslintTester.addRuleTest("lib/rules/no-assign-exports", {

    valid: [
        fixtures.exports.MODIFY_EXPORTS,
        fixtures.exports.ASSIGN_MODULE_EXPORTS,
        fixtures.exports.NO_CJS_ASSIGN_EXPORTS
    ],

    invalid: [
        {
            code: fixtures.exports.ASSIGN_EXPORTS,
            errors: [{
                message: "Invalid assignment to `exports`.",
                type: "AssignmentExpression"
            }]
        }
    ]

});
