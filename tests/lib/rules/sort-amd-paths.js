/**
 * @fileoverview Tests for `sort-amd-paths` rule
 * @author Ondřej Brejla <ondrej@brejla.cz>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/sort-amd-paths");

function makeErrorMessage(expectedPath) {
    return {
        message: "Required paths are not in alphabetical order (expected '" + expectedPath + "').",
        type: "Literal"
    };
}

testRule("sort-amd-paths", rule, {

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
        fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,

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

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
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

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
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

        // valid `define` with { "compare": "dirname-basename", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "preserve" }]
        },

        // valid `define` with { "compare": "fullpath", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "fullpath", "sortPlugins": "preserve" }]
        },

        // valid `define` with { "compare": "basename", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ "compare": "basename", "sortPlugins": "preserve" }]
        },

        // valid `define` with { "compare": "dirname-basename", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "ignore" }]
        },

        // valid `define` with { "compare": "fullpath", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "fullpath", "sortPlugins": "ignore" }]
        },

        // valid `define` with { "compare": "basename", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ "compare": "basename", "sortPlugins": "ignore" }]
        },

        // valid `define` with { "compare": "dirname-basename", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "first" }]
        },

        // valid `define` with { "compare": "fullpath", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "fullpath", "sortPlugins": "first" }]
        },

        // valid `define` with { "compare": "basename", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_FIRST,
            options: [{ "compare": "basename", "sortPlugins": "first" }]
        },

        // valid `define` with { "compare": "dirname-basename", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "last" }]
        },

        // valid `define` with { "compare": "fullpath", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "fullpath", "sortPlugins": "last" }]
        },

        // valid `define` with { "compare": "basename", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_LAST,
            options: [{ "compare": "basename", "sortPlugins": "last" }]
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

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
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
        },

        // invalid `define` with { "compare": "dirname-basename", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "fullpath", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "fullpath", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "fullpath", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "fullpath", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "basename", "sortPlugins": "preserve" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_FIRST,
            options: [{ "compare": "basename", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("awhat/ever1/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_LAST,
            options: [{ "compare": "basename", "sortPlugins": "preserve" }],
            errors: [makeErrorMessage("hhh!dwhat/ever5/ddd")]
        },

        // invalid `define` with { "compare": "dirname-basename", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("ccc/ccc/ccc")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "fullpath", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "fullpath", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("ccc/ccc/ccc")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "fullpath", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "fullpath", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "basename", "sortPlugins": "ignore" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_FIRST,
            options: [{ "compare": "basename", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("awhat/ever1/aaa")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_LAST,
            options: [{ "compare": "basename", "sortPlugins": "ignore" }],
            errors: [makeErrorMessage("hhh!dwhat/ever5/ddd")]
        },

        // invalid `define` with { "compare": "dirname-basename", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "fullpath", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "fullpath", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "fullpath", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_LAST,
            options: [{ "compare": "fullpath", "sortPlugins": "first" }],
            errors: [makeErrorMessage("bbb!fff/fff/fff1")]
        },

        // invalid `define` with { "compare": "basename", "sortPlugins": "first" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ "compare": "basename", "sortPlugins": "first" }],
            errors: [makeErrorMessage("hhh!dwhat/ever5/ddd")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_LAST,
            options: [{ "compare": "basename", "sortPlugins": "first" }],
            errors: [makeErrorMessage("hhh!dwhat/ever5/ddd")]
        },

        // invalid `define` with { "compare": "dirname-basename", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "last" }],
            errors: [makeErrorMessage("ccc/ccc/ccc")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "dirname-basename", "sortPlugins": "last" }],
            errors: [makeErrorMessage("ggg/ggg/ggg")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "dirname-basename", "sortPlugins": "last" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        // invalid `define` with { "compare": "fullpath", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_PRESERVE,
            options: [{ "compare": "fullpath", "sortPlugins": "last" }],
            errors: [makeErrorMessage("ccc/ccc/ccc")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_IGNORE,
            options: [{ "compare": "fullpath", "sortPlugins": "last" }],
            errors: [makeErrorMessage("ggg/ggg/ggg")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_PLUGIN_FIRST,
            options: [{ "compare": "fullpath", "sortPlugins": "last" }],
            errors: [makeErrorMessage("aaa/aaa/aaa")]
        },

        // invalid `define` with { "compare": "basename", "sortPlugins": "last" }

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ "compare": "basename", "sortPlugins": "last" }],
            errors: [makeErrorMessage("gwhat/ever4/ggg")]
        },

        {
            code: fixtures.ALPHABETICAL_PATHS_BASENAME_PLUGIN_FIRST,
            options: [{ "compare": "basename", "sortPlugins": "last" }],
            errors: [makeErrorMessage("awhat/ever1/aaa")]
        }
    ]

});
