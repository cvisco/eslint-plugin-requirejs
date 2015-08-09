/**
 * @fileoverview Tests for `one-dependency-per-line` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/one-dependency-per-line");


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var ALWAYS_PATHS_ERROR = {
    message: "Only one dependency path is permitted per line.",
    type: "CallExpression"
};

var ALWAYS_NAMES_ERROR = {
    message: "Only one dependency name is permitted per line.",
    type: "CallExpression"
};

var NEVER_PATHS_ERROR = {
    message: "Dependency paths must appear on one line.",
    type: "CallExpression"
};

var NEVER_NAMES_ERROR = {
    message: "Dependency names must appear on one line.",
    type: "CallExpression"
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

(new RuleTester()).run("one-dependency-per-line", rule, {

    valid: [

        // Should ignore irrelevant or malformed definitions
        fixtures.FUNCTION_DEFINE,
        fixtures.EMPTY_DEFINE,
        fixtures.OBJECT_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.BAD_DEFINE,
        fixtures.BAD_REQUIRE_EMPTY,
        fixtures.BAD_REQUIRE_INVALID_CALLBACK,
        fixtures.BAD_REQUIRE_NO_DEPS,
        fixtures.BAD_REQUIRE_OBJECT,
        fixtures.BAD_REQUIRE_STRING_DEP,
        fixtures.BAD_REQUIREJS_STRING_DEP,

        // zero deps should never trigger warning, regardless of options
        {
            code: fixtures.amd.deps.none,
            options: [{}]
        },
        {
            code: fixtures.amd.deps.none,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.amd.deps.none,
            options: [{ "names": "never" }]
        },

        // Default options: "always" for both
        {
            code: fixtures.amd.deps.multi_line.one,
            options: [{}]
        },
        {
            code: fixtures.amd.deps.multi_line.two,
            options: [{}]
        },
        {
            code: fixtures.amd.deps.multi_line.three,
            options: [{}]
        },
        {
            code: fixtures.amd.deps.multi_line.four,
            options: [{}]
        },

        // "never" for both
        {
            code: fixtures.amd.deps.single_line.one,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.amd.deps.single_line.two,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.amd.deps.single_line.three,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.amd.deps.single_line.four,
            options: [{ "paths": "never", "names": "never" }]
        },

        // "never" for names
        {
            code: fixtures.amd.deps.multi_line_paths.one,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.two,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.three,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.four,
            options: [{ "names": "never" }]
        },

        // "never" for paths
        {
            code: fixtures.amd.deps.multi_line_names.one,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_names.two,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_names.three,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.amd.deps.multi_line_names.four,
            options: [{ "paths": "never" }]
        },

        // Minimum values should not warn on fewer dependencies
        {
            code: fixtures.amd.deps.single_line.one,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.amd.deps.single_line.two,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.amd.deps.single_line.one,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.amd.deps.single_line.two,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.one,
            options: [{ "paths": "always", "names": 2 }]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.two,
            options: [{ "paths": "always", "names": 2 }]
        },
        {
            code: fixtures.amd.deps.multi_line_names.one,
            options: [{ "paths": 2, "names": "always" }]
        },
        {
            code: fixtures.amd.deps.multi_line_names.two,
            options: [{ "paths": 2, "names": "always" }]
        }
    ],

    invalid: [

        // Default options: "always" for both
        {
            code: fixtures.amd.deps.single_line.two,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.single_line.three,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.single_line.four,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.two,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.three,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.four,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.two,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.three,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.four,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ]
        },

        // "never" for both
        {
            code: fixtures.amd.deps.multi_line.two,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line.three,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line.four,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.two,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.three,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.four,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.two,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.three,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.four,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },

        // Minimum values should warn when threshold exceeded
        {
            code: fixtures.amd.deps.single_line.three,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.single_line.four,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.single_line.three,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.single_line.four,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.three,
            options: [{ "paths": "always", "names": 2 }],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_paths.four,
            options: [{ "paths": "always", "names": 2 }],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.three,
            options: [{ "paths": 2, "names": "always" }],
            errors: [ ALWAYS_PATHS_ERROR ]
        },
        {
            code: fixtures.amd.deps.multi_line_names.four,
            options: [{ "paths": 2, "names": "always" }],
            errors: [ ALWAYS_PATHS_ERROR ]
        }
    ]

});
