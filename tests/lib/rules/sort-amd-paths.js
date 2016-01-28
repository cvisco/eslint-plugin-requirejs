/**
 * @fileoverview Tests for `sort-amd-paths` rule
 * @author Ondřej Brejla <ondrej@brejla.cz>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/sort-amd-paths");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

function makeErrorMessage(expectedPath) {
    return {
        message: "Required paths are not in alphabetical order (expected '" + expectedPath + "').",
        type: "Literal"
    };
}

var ruleTester = new RuleTester();

ruleTester.run("sort-amd-paths", rule, {

    valid: [
        // valid `define`

        fixtures.ALPHABETICAL_PATHS_NO_PATH,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.ALPHABETICAL_PATHS_ONE_PATH_IN_ARRAY,
        fixtures.ALPHABETICAL_PATHS_MORE_PATHS_IN_ARRAY,
        fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
        fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
        fixtures.ALPHABETICAL_PATHS_IGNORED_PATHS,
        fixtures.ALPHABETICAL_PATHS_SLASH_PUNC_VALID,

        // valid `define` with { "compare": "dirname-basename" }

        {
            code: fixtures.ALPHABETICAL_PATHS_NO_PATH,
            options: [{ "compare": "dirname-basename" }]
        },

        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ "compare": "dirname-basename" }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_ONE_PATH_IN_ARRAY,
            options: [{ "compare": "dirname-basename" }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_MORE_PATHS_IN_ARRAY,
            options: [{ "compare": "dirname-basename" }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "dirname-basename" }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "dirname-basename" }]
        },

        // valid `define` with { "compare": "dirname-basename", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_NO_PATH,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_ONE_PATH_IN_ARRAY,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_MORE_PATHS_IN_ARRAY,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }]
        },

        // valid `define` with { "compare": "dirname-basename", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_NO_PATH,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }]
        },

        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_ONE_PATH_IN_ARRAY,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }]
        },

        // valid `define` with { "compare": "fullpath" }

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_VALID,
            options: [{ "compare": "fullpath" }]
        },

        // valid `define` with { "compare": "fullpath", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_VALID,
            options: [{ "compare": "fullpath", "ignoreCase": true }]
        },

        // valid `define` with { "compare": "fullpath", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "fullpath", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_VALID,
            options: [{ "compare": "fullpath", "ignoreCase": false }]
        },

        // valid `define` with { "compare": "basename" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_VALID_ORDER,
            options: [{ "compare": "basename" }]
        },

        // valid `define` with { "compare": "basename", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_VALID_ORDER,
            options: [{ "compare": "basename", "ignoreCase": true }]
        },

        // valid `define` with { "compare": "basename", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_VALID_ORDER,
            options: [{ "compare": "basename", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "basename", "ignoreCase": false }]
        },

        // valid common require

        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIREJS,

        // valid non-AMD modules

        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR,
        fixtures.CJS_WITH_INVALID_EXPORTS,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK
    ],

    invalid: [
        // invalid `define`

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_SLASH_PUNC_INVALID,
            errors: [makeErrorMessage("foo/bar/baz/Bat")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_FIRST_LONGER_INVALID,
            errors: [makeErrorMessage("foo/bar/baz/Bat")]
        },

        // invalid `define` with { "compare": "dirname-basename" }

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            options: [{ "compare": "dirname-basename" }],
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        },

        // invalid `define` with { "compare": "dirname-basename", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            options: [{ "compare": "dirname-basename", "ignoreCase": true }],
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        },

        // invalid `define` with { "compare": "dirname-basename", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            options: [{ "compare": "dirname-basename", "ignoreCase": false }],
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        },

        // invalid `define` with { "compare": "fullpath" }

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "fullpath" }],
            errors: [makeErrorMessage("aaa/bbb/ccc/ddd")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "fullpath" }],
            errors: [makeErrorMessage("aaa/bbb/ccc/ddd")]
        },

        // invalid `define` with { "compare": "fullpath", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "fullpath", "ignoreCase": true }],
            errors: [makeErrorMessage("aaa/bbb/ccc/ddd")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_CAPITAL,
            options: [{ "compare": "fullpath", "ignoreCase": true }],
            errors: [makeErrorMessage("aaa/bbb/ccc/ddd")]
        },

        // invalid `define` with { "compare": "fullpath", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_FULLPATH_INVALID,
            options: [{ "compare": "fullpath", "ignoreCase": false }],
            errors: [makeErrorMessage("aaa/bbb/ccc/ddd")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            options: [{ "compare": "fullpath", "ignoreCase": false }],
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        },

        // invalid `define` with { "compare": "basename" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_INVALID_ORDER,
            errors: [makeErrorMessage("xxx/aaa")],
            options: [{ "compare": "basename" }]
        },

        // invalid `define` with { "compare": "basename", "ignoreCase": true }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_INVALID_ORDER,
            errors: [makeErrorMessage("xxx/aaa")],
            options: [{ "compare": "basename", "ignoreCase": true }]
        },

        // invalid `define` with { "compare": "basename", "ignoreCase": false }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_INVALID_ORDER,
            errors: [makeErrorMessage("xxx/aaa")],
            options: [{ "compare": "basename", "ignoreCase": false }]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_INVALID_ORDER,
            options: [{ "compare": "basename", "ignoreCase": false }],
            errors: [makeErrorMessage("aaa/bbb/Aaa")]
        }
    ]

});
