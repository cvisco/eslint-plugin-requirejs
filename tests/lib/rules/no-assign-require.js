/**
 * @fileoverview Tests for `no-assign-require` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-assign-require");

var MESSAGE = "Invalid assignment to `require`.";

var ruleTester = new RuleTester();

ruleTester.run("no-assign-require", rule, {

    valid: [
        fixtures.ASSIGN_TO_FOO_REQUIRE
    ],

    invalid: [
        { code: fixtures.DECLARE_REQUIRE, errors: [{ message: MESSAGE, type: "VariableDeclarator" }] },
        { code: fixtures.ASSIGN_TO_REQUIRE, errors: [{ message: MESSAGE, type: "AssignmentExpression" }] },
        { code: fixtures.ASSIGN_TO_WINDOW_REQUIRE, errors: [{ message: MESSAGE, type: "AssignmentExpression" }] }
    ]

});
