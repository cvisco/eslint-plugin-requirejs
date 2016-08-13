/**
 * @fileoverview Tests for `no-multiple-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-multiple-define");

testRule("no-multiple-define", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.MULTIPLE_DEFINE_ONE_CALL
    ],

    invalid: [
        {
            code: fixtures.MULTIPLE_DEFINE,
            errors: [{
                message: "Multiple `define` calls in a single file are not permitted",
                type: "CallExpression",
                line: 4,
                column: 1
            }]
        }
    ]

});
