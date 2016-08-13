/**
 * @fileoverview Tests for `one-dependency-per-line` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/one-dependency-per-line");

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
            code: fixtures.AMD_DEPS_NONE,
            options: [{}]
        },
        {
            code: fixtures.AMD_DEPS_NONE,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_NONE,
            options: [{ "names": "never" }]
        },

        // Default options: "always" for both
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_ONE,
            options: [{}]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_TWO,
            options: [{}]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_THREE,
            options: [{}]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_FOUR,
            options: [{}]
        },

        // "never" for both
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_ONE,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{ "paths": "never", "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{ "paths": "never", "names": "never" }]
        },

        // "never" for names
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_ONE,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_TWO,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_THREE,
            options: [{ "names": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_FOUR,
            options: [{ "names": "never" }]
        },

        // "never" for paths
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_ONE,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_TWO,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_THREE,
            options: [{ "paths": "never" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_FOUR,
            options: [{ "paths": "never" }]
        },

        // Minimum values should not warn on fewer dependencies
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_ONE,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_ONE,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{ "paths": 2, "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_ONE,
            options: [{ "paths": "always", "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_TWO,
            options: [{ "paths": "always", "names": 2 }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_ONE,
            options: [{ "paths": 2, "names": "always" }]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_TWO,
            options: [{ "paths": 2, "names": "always" }]
        }
    ],

    invalid: [

        // Default options: "always" for both
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_TWO
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_THREE
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_FOUR
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_TWO,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_TWO
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_THREE,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_THREE
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_FOUR,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_FOUR
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_TWO,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_TWO
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_THREE,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_THREE
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_FOUR,
            options: [{}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_FOUR
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_NO_INDENT_TWO,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NO_INDENT_TWO
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_NO_INDENT_THREE,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NO_INDENT_THREE
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_NO_INDENT_FOUR,
            options: [{}],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NO_INDENT_FOUR
        },

        // "always" for paths only
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{"names": "never"}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_PATHS_TWO
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{"names": "never"}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_PATHS_THREE
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{"names": "never"}],
            errors: [ ALWAYS_PATHS_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_PATHS_FOUR
        },

        // "always" for names only
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_TWO,
            options: [{"paths": "never"}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NAMES_TWO
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{"paths": "never"}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NAMES_THREE
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{"paths": "never"}],
            errors: [ ALWAYS_NAMES_ERROR ],
            output: fixtures.AMD_DEPS_MULTI_LINE_NAMES_FOUR
        },

        // "never" for both
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_TWO,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_THREE,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_FOUR,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR, NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_TWO,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_THREE,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_FOUR,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_PATHS_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_TWO,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_THREE,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_FOUR,
            options: [{ "paths": "never", "names": "never" }],
            errors: [ NEVER_NAMES_ERROR ]
        },

        // Minimum values should warn when threshold exceeded
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_THREE,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_SINGLE_LINE_FOUR,
            options: [{ "paths": 2, "names": 2 }],
            errors: [ ALWAYS_PATHS_ERROR, ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_THREE,
            options: [{ "paths": "always", "names": 2 }],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_PATHS_FOUR,
            options: [{ "paths": "always", "names": 2 }],
            errors: [ ALWAYS_NAMES_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_THREE,
            options: [{ "paths": 2, "names": "always" }],
            errors: [ ALWAYS_PATHS_ERROR ]
        },
        {
            code: fixtures.AMD_DEPS_MULTI_LINE_NAMES_FOUR,
            options: [{ "paths": 2, "names": "always" }],
            errors: [ ALWAYS_PATHS_ERROR ]
        }
    ]

});
