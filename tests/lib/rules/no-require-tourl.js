/**
 * @fileoverview Tests for `no-require-tourl` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    util = require("util"),
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-require-tourl");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var MESSAGE = "Use of `require.%s` is not allowed.";

var ruleTester = new RuleTester();

ruleTester.run("no-require-tourl", rule, {

    valid: [
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        {
            code: fixtures.REQUIRE_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIREJS_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIRE_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: fixtures.REQUIREJS_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        }
    ]

});
