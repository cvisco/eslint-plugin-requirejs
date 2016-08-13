/**
 * @fileoverview Tests for `no-require-tourl` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

const RuleTester = require("eslint").RuleTester;
const util = require("util");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-require-tourl");

const MESSAGE = "Use of `require.%s` is not allowed.";

const ruleTester = new RuleTester();

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
