/**
 * @fileoverview Tests for `enforce-define` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester"),
    fixtures = require("../../fixtures");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR = {
    message: "File must be wrapped in a `define` call",
    type: "Program"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/enforce-define", {

    valid: [

        // Any sort of define should work
        fixtures.MULTIPLE_DEFINE,
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_FUNC_EXPR,
        fixtures.CJS_WITH_INVALID_EXPORTS,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_CJS_DEFINE,
        fixtures.AMD_DEFINE_WITH_JS_EXT,
        fixtures.CJS_WITH_JS_EXT,
        fixtures.NAMED_AMD_DEFINE_WITH_JS_EXT,
        fixtures.NAMED_CJS_DEFINE_WITH_JS_EXT,

        // All of the invalid cases should work if we ignore the file
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "main.js",
            args: [ 1, "main.js" ]
        },
        {
            code: fixtures.NON_WRAPPED_EXPORTS,
            filename: "main.js",
            args: [ 1, "main.js" ]
        },
        {
            code: fixtures.AMD_REQUIRE,
            filename: "main.js",
            args: [ 1, "main.js" ]
        },
        {
            code: fixtures.AMD_REQUIREJS,
            filename: "main.js",
            args: [ 1, "main.js" ]
        },

        // Ignore should work with full path
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "path/to/main.js",
            args: [ 1, [ "main.js" ] ]
        },

        // Ignore should support multiple filenames
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "main.js",
            args: [ 1, [ "main.js", "index.js" ] ]
        },
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "index.js",
            args: [ 1, [ "main.js", "index.js" ] ]
        }
    ],

    invalid: [
        {
            code: fixtures.UNWRAPPED_FILE,
            errors: [ERROR]
        },
        {
            code: fixtures.NON_WRAPPED_EXPORTS,
            errors: [ERROR]
        },
        {
            code: fixtures.AMD_REQUIRE,
            errors: [ERROR]
        },
        {
            code: fixtures.AMD_REQUIREJS,
            errors: [ERROR]
        },
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "foo.js",
            args: [ 1, "main.js" ],
            errors: [ERROR]
        },
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "foo.js",
            args: [ 1, [ "main.js", "index.js" ] ],
            errors: [ERROR]
        },
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "path/to/foo.js",
            args: [ 1, "main.js" ],
            errors: [ERROR]
        },
        {
            code: fixtures.UNWRAPPED_FILE,
            filename: "path/to/main.js/foo.js",
            args: [ 1, "main.js" ],
            errors: [ERROR]
        }
    ]

});
