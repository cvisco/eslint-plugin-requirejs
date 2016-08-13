/**
 * @fileoverview Tests for `no-commonjs-exports` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const RuleTester = require("eslint").RuleTester;
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-commonjs-exports");

const ERROR = {
    message: "Unexpected use of `exports` in module definition.",
    type: "AssignmentExpression"
};

const ruleTester = new RuleTester();

ruleTester.run("no-commonjs-exports", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_CJS_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        { code: fixtures.CJS_WITH_EXPORTS, errors: [ERROR] }
    ]

});
