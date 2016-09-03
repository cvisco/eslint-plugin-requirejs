/**
 * @file    Tests for `sort-amd-paths` rule
 * @author  Ondřej Brejla <ondrej@brejla.cz>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/sort-amd-paths");

// -----------------------------------------------------------------------------
// Fixtures
// -----------------------------------------------------------------------------

const BASENAME_CAPITAL = `
    define([
        'aaa/bbb/Xxx',
        'aaa/bbb/ccc/ddd'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const NO_PATH = `
    define(function () {
        /* ... */
    });
`;


const ONE_PATH_IN_ARRAY = `
    define([
        'foo/bar/baz'
    ], function (baz) {
        /* ... */
    });
`;

const MORE_PATHS_IN_ARRAY = `
    define([
        'base.dt/js/DesignerUtils',
        'components.dt/js/deleters/DeletersRegistry',
        'core/js/api/Listenable',
        'core/js/api/utils/KeyConstants',
        'pages.dt/js/api/Pages',
        'pages.dt/js/api/ViewGeneratorModes'
    ], function (aaa, ccc, ddd, bbb, yyy) {
        /* ... */
    });
`;

const FULLPATH_INVALID = `
    define([
        'aaa/bbb/xxx',
        'aaa/bbb/ccc/ddd'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const DIRNAME_WRONG_ORDER = `
    define([
        'aaa/bbb/ccc/ddd/aaa',
        'aaa/bbb/ccc/xxx'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const IGNORED_PATHS = `
    define([
        'aaa/bbb/xxx',
        'aaa/bbb/yyy',
        'aaa/bbb/zzz',
        // following lines should be ignored
        'aaa/bbb/aaa',
        'aaa/bbb/bbb'
    ], function (xxx, yyy, zzz) {
        /* ... */
    });
`;

const SLASH_PUNC_VALID = `
    define([
        'foo/bar/baz/Bat',
        'foo-bar/baz/Bat',
        'foo.bar/baz/Bat'
    ], function (bat1, bat2, bat3) {
        /* ... */
    });
`;

const PLUGIN_PRESERVE = `
    define([
        'aaa/aaa/aaa',
        'bbb!fff/fff/fff',
        'ccc/ccc/ccc',
        'ggg/ggg/ggg',
        'hhh!ddd/ddd/ddd'
    ], function (aaa, fff, ccc, ggg, ddd) {
        /* ... */
    });
`;

const FULLPATH_VALID = `
    define([
        'aaa/bbb/ccc/ddd',
        'aaa/bbb/xxx'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const BASENAME_VALID_ORDER = `
    define([
        'xxx/aaa',
        'aaa/xxx'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const BASENAME_PLUGIN_PRESERVE_IGNORE = `
    define([
        'awhat/ever1/aaa',
        'cwhat/ever3/ccc',
        'hhh!dwhat/ever5/ddd',
        'bbb!fwhat/ever2/fff',
        'gwhat/ever4/ggg'
    ], function (aaa, ccc, ddd, fff, ggg) {
        /* ... */
    });
`;

const PLUGIN_IGNORE = `
    define([
        'aaa/aaa/aaa',
        'ccc/ccc/ccc',
        'bbb!fff/fff/fff1',
        'bbb!fff/fff/fff2',
        'ggg/ggg/ggg'
    ], function (aaa, ccc, fff1, fff2, ggg) {
        /* ... */
    });
`;

const PLUGIN_FIRST = `
    define([
        'bbb!fff/fff/fff1',
        'bbb!fff/fff/fff2',
        'aaa/aaa/aaa',
        'ccc/ccc/ccc',
        'ggg/ggg/ggg'
    ], function (fff1, fff2, aaa, ccc, ggg) {
        /* ... */
    });
`;

const BASENAME_PLUGIN_FIRST = `
    define([
        'hhh!dwhat/ever5/ddd',
        'bbb!fwhat/ever2/fff',
        'awhat/ever1/aaa',
        'cwhat/ever3/ccc',
        'gwhat/ever4/ggg'
    ], function (ddd, fff, aaa, ccc, ggg) {
        /* ... */
    });
`;

const PLUGIN_LAST = `
    define([
        'aaa/aaa/aaa',
        'ccc/ccc/ccc',
        'ggg/ggg/ggg',
        'bbb!fff/fff/fff1',
        'bbb!fff/fff/fff2'
    ], function (aaa, ccc, ggg, fff1, fff2) {
        /* ... */
    });
`;

const BASENAME_PLUGIN_LAST = `
    define([
        'awhat/ever1/aaa',
        'cwhat/ever3/ccc',
        'gwhat/ever4/ggg',
        'hhh!dwhat/ever5/ddd',
        'bbb!fwhat/ever2/fff'
    ], function (aaa, ccc, ggg, ddd, fff) {
        /* ... */
    });
`;

const INVALID_ORDER = `
    define([
        'aaa/bbb/ccc',
        'aaa/bbb/Aaa'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const SLASH_PUNC_INVALID = `
    define([
        'foo.bar/baz/Bat',
        'foo/bar/baz/Bat',
        'foo-bar/baz/Bat'
    ], function (bat1, bat2, bat3) {
        /* ... */
    });
`;

const FIRST_LONGER_INVALID = `
    define([
        'foo/bar/baz/Batttt',
        'foo/bar/baz/Bat'
    ], function (bat1, bat2) {
        /* ... */
    });
`;

const BASENAME_INVALID_ORDER = `
    define([
        'aaa/xxx',
        'xxx/aaa'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

const BASENAME_IDENTICAL = `
    define([
        'aaa/xxx',
        'bbb/xxx',
        'ccc/xxx'
    ], function (ccc, aaa) {
        /* ... */
    });
`;

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const errorMsg = (expected) => ({
    message: `Required paths are not in alphabetical order (expected '${expected}').`,
    type: "Literal"
});

testRule("sort-amd-paths", rule, {

    valid: [
        fixtures.AMD_EMPTY_DEFINE,
        NO_PATH,
        ONE_PATH_IN_ARRAY,
        MORE_PATHS_IN_ARRAY,
        BASENAME_CAPITAL,
        FULLPATH_INVALID,
        IGNORED_PATHS,
        SLASH_PUNC_VALID,
        PLUGIN_PRESERVE,
        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: NO_PATH,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: ONE_PATH_IN_ARRAY,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: MORE_PATHS_IN_ARRAY,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename" }]
        },
        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: NO_PATH,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: ONE_PATH_IN_ARRAY,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: MORE_PATHS_IN_ARRAY,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename", ignoreCase: true }]
        },
        {
            code: fixtures.AMD_EMPTY_DEFINE,
            options: [{ compare: "dirname-basename", ignoreCase: false }]
        },
        {
            code: NO_PATH,
            options: [{ compare: "dirname-basename", ignoreCase: false }]
        },
        {
            code: ONE_PATH_IN_ARRAY,
            options: [{ compare: "dirname-basename", ignoreCase: false }]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "dirname-basename", ignoreCase: false }]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "dirname-basename", ignoreCase: false }]
        },
        {
            code: FULLPATH_VALID,
            options: [{ compare: "fullpath" }]
        },
        {
            code: FULLPATH_VALID,
            options: [{ compare: "fullpath", ignoreCase: true }]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "fullpath", ignoreCase: false }]
        },
        {
            code: FULLPATH_VALID,
            options: [{ compare: "fullpath", ignoreCase: false }]
        },
        {
            code: BASENAME_VALID_ORDER,
            options: [{ compare: "basename" }]
        },
        {
            code: BASENAME_IDENTICAL,
            options: [{ compare: "basename" }]
        },
        {
            code: BASENAME_VALID_ORDER,
            options: [{ compare: "basename", ignoreCase: true }]
        },
        {
            code: BASENAME_VALID_ORDER,
            options: [{ compare: "basename", ignoreCase: false }]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "basename", ignoreCase: false }]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename", sortPlugins: "preserve" }]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "fullpath", sortPlugins: "preserve" }]
        },
        {
            code: BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ compare: "basename", sortPlugins: "preserve" }]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "dirname-basename", sortPlugins: "ignore" }]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "fullpath", sortPlugins: "ignore" }]
        },
        {
            code: BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ compare: "basename", sortPlugins: "ignore" }]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "dirname-basename", sortPlugins: "first" }]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "fullpath", sortPlugins: "first" }]
        },
        {
            code: BASENAME_PLUGIN_FIRST,
            options: [{ compare: "basename", sortPlugins: "first" }]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "dirname-basename", sortPlugins: "last" }]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "fullpath", sortPlugins: "last" }]
        },
        {
            code: BASENAME_PLUGIN_LAST,
            options: [{ compare: "basename", sortPlugins: "last" }]
        },
        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIREJS,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR,
        fixtures.CJS_WITH_INVALID_EXPORTS,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK
    ],

    invalid: [
        {
            code: INVALID_ORDER,
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: SLASH_PUNC_INVALID,
            errors: [errorMsg("foo/bar/baz/Bat")]
        },
        {
            code: FIRST_LONGER_INVALID,
            errors: [errorMsg("foo/bar/baz/Bat")]
        },
        {
            code: PLUGIN_IGNORE,
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_FIRST,
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_LAST,
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: INVALID_ORDER,
            options: [{ compare: "dirname-basename" }],
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: DIRNAME_WRONG_ORDER,
            options: [{ compare: "dirname-basename" }],
            errors: [errorMsg("aaa/bbb/ccc/xxx")]
        },
        {
            code: INVALID_ORDER,
            options: [{ compare: "dirname-basename", ignoreCase: true }],
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: INVALID_ORDER,
            options: [{ compare: "dirname-basename", ignoreCase: false }],
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "fullpath" }],
            errors: [errorMsg("aaa/bbb/ccc/ddd")]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "fullpath" }],
            errors: [errorMsg("aaa/bbb/ccc/ddd")]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "fullpath", ignoreCase: true }],
            errors: [errorMsg("aaa/bbb/ccc/ddd")]
        },
        {
            code: BASENAME_CAPITAL,
            options: [{ compare: "fullpath", ignoreCase: true }],
            errors: [errorMsg("aaa/bbb/ccc/ddd")]
        },
        {
            code: FULLPATH_INVALID,
            options: [{ compare: "fullpath", ignoreCase: false }],
            errors: [errorMsg("aaa/bbb/ccc/ddd")]
        },
        {
            code: INVALID_ORDER,
            options: [{ compare: "fullpath", ignoreCase: false }],
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: BASENAME_INVALID_ORDER,
            errors: [errorMsg("xxx/aaa")],
            options: [{ compare: "basename" }]
        },
        {
            code: BASENAME_INVALID_ORDER,
            errors: [errorMsg("xxx/aaa")],
            options: [{ compare: "basename", ignoreCase: true }]
        },
        {
            code: BASENAME_INVALID_ORDER,
            errors: [errorMsg("xxx/aaa")],
            options: [{ compare: "basename", ignoreCase: false }]
        },
        {
            code: INVALID_ORDER,
            options: [{ compare: "basename", ignoreCase: false }],
            errors: [errorMsg("aaa/bbb/Aaa")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "dirname-basename", sortPlugins: "preserve" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "dirname-basename", sortPlugins: "preserve" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "dirname-basename", sortPlugins: "preserve" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "fullpath", sortPlugins: "preserve" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "fullpath", sortPlugins: "preserve" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "fullpath", sortPlugins: "preserve" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: BASENAME_PLUGIN_FIRST,
            options: [{ compare: "basename", sortPlugins: "preserve" }],
            errors: [errorMsg("awhat/ever1/aaa")]
        },
        {
            code: BASENAME_PLUGIN_LAST,
            options: [{ compare: "basename", sortPlugins: "preserve" }],
            errors: [errorMsg("hhh!dwhat/ever5/ddd")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename", sortPlugins: "ignore" }],
            errors: [errorMsg("ccc/ccc/ccc")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "dirname-basename", sortPlugins: "ignore" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "dirname-basename", sortPlugins: "ignore" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "fullpath", sortPlugins: "ignore" }],
            errors: [errorMsg("ccc/ccc/ccc")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "fullpath", sortPlugins: "ignore" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "fullpath", sortPlugins: "ignore" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: BASENAME_PLUGIN_FIRST,
            options: [{ compare: "basename", sortPlugins: "ignore" }],
            errors: [errorMsg("awhat/ever1/aaa")]
        },
        {
            code: BASENAME_PLUGIN_LAST,
            options: [{ compare: "basename", sortPlugins: "ignore" }],
            errors: [errorMsg("hhh!dwhat/ever5/ddd")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "dirname-basename", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "dirname-basename", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "fullpath", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "fullpath", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: PLUGIN_LAST,
            options: [{ compare: "fullpath", sortPlugins: "first" }],
            errors: [errorMsg("bbb!fff/fff/fff1")]
        },
        {
            code: BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ compare: "basename", sortPlugins: "first" }],
            errors: [errorMsg("hhh!dwhat/ever5/ddd")]
        },
        {
            code: BASENAME_PLUGIN_LAST,
            options: [{ compare: "basename", sortPlugins: "first" }],
            errors: [errorMsg("hhh!dwhat/ever5/ddd")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "dirname-basename", sortPlugins: "last" }],
            errors: [errorMsg("ccc/ccc/ccc")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "dirname-basename", sortPlugins: "last" }],
            errors: [errorMsg("ggg/ggg/ggg")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "dirname-basename", sortPlugins: "last" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: PLUGIN_PRESERVE,
            options: [{ compare: "fullpath", sortPlugins: "last" }],
            errors: [errorMsg("ccc/ccc/ccc")]
        },
        {
            code: PLUGIN_IGNORE,
            options: [{ compare: "fullpath", sortPlugins: "last" }],
            errors: [errorMsg("ggg/ggg/ggg")]
        },
        {
            code: PLUGIN_FIRST,
            options: [{ compare: "fullpath", sortPlugins: "last" }],
            errors: [errorMsg("aaa/aaa/aaa")]
        },
        {
            code: BASENAME_PLUGIN_PRESERVE_IGNORE,
            options: [{ compare: "basename", sortPlugins: "last" }],
            errors: [errorMsg("gwhat/ever4/ggg")]
        },
        {
            code: BASENAME_PLUGIN_FIRST,
            options: [{ compare: "basename", sortPlugins: "last" }],
            errors: [errorMsg("awhat/ever1/aaa")]
        }
    ]
});
