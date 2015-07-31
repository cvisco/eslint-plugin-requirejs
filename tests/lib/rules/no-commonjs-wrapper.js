/**
 * @fileoverview Tests for `no-commonjs-wrapper` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-commonjs-wrapper");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR = {
    message: "Simplified CommonJS Wrapper form of `define` is not allowed",
    type: "CallExpression"
};

var ruleTester = new RuleTester();

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
