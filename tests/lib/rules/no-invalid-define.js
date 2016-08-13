/**
 * @fileoverview Tests for `no-invalid-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-invalid-define");

const ERROR = {
    message: "Invalid module definition",
    type: "CallExpression"
};

testRule("no-invalid-define", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        { code: fixtures.EMPTY_DEFINE, errors: [ERROR] },
        { code: fixtures.BAD_DEFINE, errors: [ERROR] }
    ]

});
