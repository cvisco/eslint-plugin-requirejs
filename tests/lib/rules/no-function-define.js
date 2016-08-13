/**
 * @fileoverview Tests for `no-function-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-function-define");

var ERROR = {
    message: "Simple function form of `define` is not allowed",
    type: "CallExpression"
};

var ruleTester = new RuleTester();

ruleTester.run("no-function-define", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        { code: fixtures.FUNCTION_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_FUNCTION_DEFINE, errors: [ERROR] }
    ]

});
