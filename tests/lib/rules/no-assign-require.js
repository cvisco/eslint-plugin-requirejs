/**
 * @file    Tests for `no-assign-require` rule
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const rule = require("../../../lib/rules/no-assign-require");

// -----------------------------------------------------------------------------
// Fixtures
// -----------------------------------------------------------------------------

const OK_PROPERTY_ASSIGNMENT = `
    foo.require = {
        bar: 'bar'
    };
`;

const OK_SIMILAR_VARIABLE = `
    var required = true;
`;

const BAD_DECLARE_REQUIRE = `
    var require = {
        deps: ['path/to/a', 'path/to/b'],
        callback: function (a, b) {
            a.foo();
            b.bar();
        }
    };
`;

const BAD_ASSIGN_TO_REQUIRE = `
    require = {
        deps: ['path/to/a', 'path/to/b'],
        callback: function (a, b) {
            a.foo();
            b.bar();
        }
    };
`;

const BAD_ASSIGN_TO_WINDOW_REQUIRE = `
    window.require = {
        deps: ['path/to/a', 'path/to/b'],
        callback: function (a, b) {
            a.foo();
            b.bar();
        }
    };
`;

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR_MSG = "Invalid assignment to `require`.";

testRule("no-assign-require", rule, {

    valid: [
        OK_PROPERTY_ASSIGNMENT,
        OK_SIMILAR_VARIABLE
    ],

    invalid: [
        {
            code: BAD_DECLARE_REQUIRE,
            errors: [
                { message: ERROR_MSG, type: "VariableDeclarator" }
            ]
        },
        {
            code: BAD_ASSIGN_TO_REQUIRE,
            errors: [
                { message: ERROR_MSG, type: "AssignmentExpression" }
            ]
        },
        {
            code: BAD_ASSIGN_TO_WINDOW_REQUIRE,
            errors: [
                { message: ERROR_MSG, type: "AssignmentExpression" }
            ]
        }
    ]

});
