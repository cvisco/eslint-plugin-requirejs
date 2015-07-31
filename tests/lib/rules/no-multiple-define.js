/**
 * @fileoverview Tests for `no-multiple-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-multiple-define");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR = {
    message: "Multiple `define` calls in a single file are not permitted",
    type: "Program"
};

var ruleTester = new RuleTester();

ruleTester.run("no-multiple-define", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE
    ],

    invalid: [
        { code: fixtures.MULTIPLE_DEFINE, errors: [ERROR] }
    ]

});
