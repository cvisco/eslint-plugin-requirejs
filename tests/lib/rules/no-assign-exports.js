/**
 * @file    Tests for `no-assign-exports` rule
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-assign-exports");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR = {
    message: "Invalid assignment to `exports`.",
    type: "AssignmentExpression"
};

testRule("no-assign-exports", rule, {

    valid: [
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        { code: fixtures.CJS_WITH_INVALID_EXPORTS, errors: [ERROR] }
    ]

});
