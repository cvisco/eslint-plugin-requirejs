/**
 * @fileoverview Tests for `no-assign-require` rule
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

var MESSAGE = "Invalid assignment to `require`.";

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-assign-require", {

    valid: [
        fixtures.ASSIGN_TO_FOO_REQUIRE
    ],

    invalid: [
        { code: fixtures.DECLARE_REQUIRE, errors: [{ message: MESSAGE, type: "VariableDeclarator" }] },
        { code: fixtures.ASSIGN_TO_REQUIRE, errors: [{ message: MESSAGE, type: "AssignmentExpression" }] },
        { code: fixtures.ASSIGN_TO_WINDOW_REQUIRE, errors: [{ message: MESSAGE, type: "AssignmentExpression" }] }
    ]

});
