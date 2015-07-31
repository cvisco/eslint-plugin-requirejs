/**
 * @fileoverview Tests for `no-object-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-object-define");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR = {
    message: "Simple Name/Value Pairs form of `define` is not allowed",
    type: "CallExpression"
};

var ruleTester = new RuleTester();

ruleTester.run("no-object-define", rule, {

    valid: [
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        { code: fixtures.OBJECT_DEFINE, errors: [ERROR] },
        { code: fixtures.NAMED_OBJECT_DEFINE, errors: [ERROR] }
    ]

});
