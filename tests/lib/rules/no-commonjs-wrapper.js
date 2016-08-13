/**
 * @fileoverview Tests for `no-commonjs-wrapper` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const RuleTester = require("eslint").RuleTester;
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-commonjs-wrapper");

const ERROR = {
    message: "Simplified CommonJS Wrapper form of `define` is not allowed",
    type: "CallExpression"
};

const ruleTester = new RuleTester();

ruleTester.run("no-commonjs-wrapper", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE
    ],

    invalid: [
        { code: fixtures.CJS_WITH_RETURN, errors: [ERROR] },
        { code: fixtures.CJS_WITH_EXPORTS, errors: [ERROR] },
        { code: fixtures.CJS_WITH_MODULE_EXPORTS, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE, errors: [ERROR] }
    ]

});
