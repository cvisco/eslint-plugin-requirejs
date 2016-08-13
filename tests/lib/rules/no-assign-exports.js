/**
 * @fileoverview Tests for `no-assign-exports` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const RuleTester = require("eslint").RuleTester;
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-assign-exports");

const ERROR = {
    message: "Invalid assignment to `exports`.",
    type: "AssignmentExpression"
};

const ruleTester = new RuleTester();

ruleTester.run("no-assign-exports", rule, {

    valid: [
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        { code: fixtures.CJS_WITH_INVALID_EXPORTS, errors: [ERROR] }
    ]

});
