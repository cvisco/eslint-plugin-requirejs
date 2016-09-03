/**
 * @file    Tests for `no-require-tourl` rule
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const util = require("util");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-require-tourl");

// -----------------------------------------------------------------------------
// Fixtures
// -----------------------------------------------------------------------------


const REQUIREJS_NAME_TO_URL = `
    define(['require'], function (require) {
        var idUrl = requirejs.nameToUrl('id');
    });
`;

const REQUIREJS_TO_URL = `
    define(['require'], function (require) {
        var cssUrl = requirejs.toUrl('./style.css');
    });
`;

const REQUIRE_NAME_TO_URL = `
    define(['require'], function (require) {
        var idUrl = require.nameToUrl('id');
    });
`;

const REQUIRE_TO_URL = `
    define(['require'], function (require) {
        var cssUrl = require.toUrl('./style.css');
    });
`;

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const MESSAGE = "Use of `require.%s` is not allowed.";

testRule("no-require-tourl", rule, {

    valid: [
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NAMED_CJS_DEFINE
    ],

    invalid: [
        {
            code: REQUIRE_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: REQUIREJS_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "toUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: REQUIRE_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        },
        {
            code: REQUIREJS_NAME_TO_URL,
            errors: [{
                message: util.format(MESSAGE, "nameToUrl"),
                type: "CallExpression"
            }]
        }
    ]

});
