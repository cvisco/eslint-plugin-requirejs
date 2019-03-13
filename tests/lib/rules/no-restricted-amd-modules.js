/**
 * @file    Tests for `no-restricted-amd-modules` rule
 * @author  Stefan Buck
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-restricted-amd-modules");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const errorMsg = expected => ({
    message: `'${expected}' module is restricted from being used.`,
    type: "Literal"
});

testRule("no-restricted-amd-modules", rule, {
    valid: [
        { code: fixtures.AMD_DEFINE, options: ["foo"] },
        { code: fixtures.FUNCTION_DEFINE, options: ["foo", "bar"] },
        { code: fixtures.AMD_DEFINE, options: ["foo", "bar"] },
        fixtures.AMD_DEFINE,
        {
            code: fixtures.AMD_DEFINE_WITH_FOO_PLUGIN_AND_JS_EXT,
            options: ["foo"]
        },
        { code: fixtures.AMD_DEFINE_WITH_JS_EXT, options: ["foo"] },
        { code: fixtures.AMD_EMPTY_DEFINE, options: ["foo"] },
        { code: fixtures.AMD_DEFINE, options: ["path/to"] },
        {
            code: fixtures.AMD_DEFINE,
            options: [{ paths: ["path", "to", "a"] }]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [{ patterns: ["path/to/c*"] }]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [{ paths: ["path/to"], patterns: ["path/to/c*"] }]
        },
        {
            code: fixtures.AMD_DEFINE_WITH_JS_EXT,
            options: [
                { paths: ["path/to"], patterns: ["path/to/*", "!path/to/a.js"] }
            ]
        }
    ],
    invalid: [
        {
            code: fixtures.AMD_DEFINE,
            options: ["path/to/a"],
            errors: [errorMsg("path/to/a")]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: ["path/to/b"],
            errors: [errorMsg("path/to/b")]
        },
        {
            code: fixtures.AMD_DEFINE_WITH_JS_EXT,
            options: [{ paths: ["path/to/a.js"] }],
            errors: [errorMsg("path/to/a.js")]
        },
        {
            code: fixtures.AMD_DEFINE_WITH_FOO_PLUGIN_AND_JS_EXT,
            options: [{ paths: ["foo!aaa/bbb/ccc.js"] }],
            errors: [errorMsg("foo!aaa/bbb/ccc.js")]
        },
        {
            code: fixtures.AMD_DEFINE_WITH_FOO_PLUGIN_AND_JS_EXT,
            options: [{ patterns: ["*!aaa/bbb/ccc.js"] }],
            errors: [
                {
                    message:
                        "'foo!aaa/bbb/ccc.js' module is restricted from being used by a pattern.",
                    type: "CallExpression"
                }
            ]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [{ patterns: ["path/to/*"] }],
            errors: [
                {
                    message:
                        "'path/to/a' module is restricted from being used by a pattern.",
                    type: "CallExpression"
                }
            ]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [{ paths: ["path/to/*"], patterns: ["path/to"] }],
            errors: [
                {
                    message:
                        "'path/to/a' module is restricted from being used by a pattern.",
                    type: "CallExpression"
                }
            ]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [
                { patterns: ["path/to/*", "!path/to/c"], paths: ["path/to"] }
            ],
            errors: [
                {
                    message:
                        "'path/to/a' module is restricted from being used by a pattern.",
                    type: "CallExpression"
                }
            ]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [
                {
                    name: "path/to/a",
                    message: "Please use 'path/to/c' module instead."
                }
            ],
            errors: [
                {
                    message:
                        "'path/to/a' module is restricted from being used. Please use 'path/to/c' module instead.",
                    type: "Literal"
                }
            ]
        },
        {
            code: fixtures.AMD_DEFINE,
            options: [
                "path/to",
                {
                    name: "path/to/a",
                    message: "Please use 'path/to/c' module instead."
                },
                "path/to/d"
            ],
            errors: [
                {
                    message:
                        "'path/to/a' module is restricted from being used. Please use 'path/to/c' module instead.",
                    type: "Literal"
                }
            ]
        }
    ]
});
