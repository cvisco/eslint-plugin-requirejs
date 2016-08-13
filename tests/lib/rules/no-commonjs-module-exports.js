/**
 * @fileoverview Tests for `no-commonjs-module-exports` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-commonjs-module-exports");

const ERROR = {
    message: "Unexpected use of `module.exports` in module definition.",
    type: "AssignmentExpression"
};

testRule("no-commonjs-module-exports", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        { code: fixtures.CJS_WITH_MODULE_EXPORTS, errors: [ERROR] },
        { code: fixtures.CJS_WITH_FUNC_EXPR, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE, errors: [ERROR] }
    ]

});
