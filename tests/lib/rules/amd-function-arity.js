/**
 * @fileoverview Tests for `amd-function-arity` rule
 * @author Kevin Partington
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/amd-function-arity");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function makeTooManyParamsError(funcName, expected, actual) {
    var message = [
        "Too many parameters in ",
        funcName,
        " callback (expected ",
        expected,
        ", found ",
        actual,
        ")."
    ].join("");

    return { message: message };
}

function makeTooFewParamsError(funcName, expected, actual) {
    var message = [
        "Not enough parameters in ",
        funcName,
        " callback (expected ",
        expected,
        ", found ",
        actual,
        ")."
    ].join("");

    return { message: message };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("amd-function-arity", rule, {

    valid: [
        // Dependency count and parameter counts equal-- always valid
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.AMD_EMPTY_REQUIRE,
        fixtures.AMD_EMPTY_REQUIREJS,
        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIRE_WITH_ERRBACK,
        fixtures.AMD_REQUIREJS,
        fixtures.AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.DYNAMIC_MIXED_AMD_REQUIRE,
        fixtures.DYNAMIC_MIXED_AMD_REQUIREJS,

        // Valid because dependency array arity is unknowable
        fixtures.DYNAMIC_VARIABLE_AMD_DEFINE,
        fixtures.DYNAMIC_VARIABLE_AMD_NAMED_DEFINE,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIRE,

        // Valid only if allowExtraDependencies is enabled
        {
            code: fixtures.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }]
        },

        // Valid only if allowedExtraDependencies are specified
        {
            code: fixtures.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["b"] }]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["a"] }]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["a"] }]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["a"] }]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["a"] }]
        }
    ],

    invalid: [
        // Too few dependencies (invalid even with allowExtraDependencies option)
        {
            code: fixtures.AMD_DEFINE_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("define", 2, 3)]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("define", 2, 3)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("require", 2, 3)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("requirejs", 2, 3)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("require", 2, 3)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("requirejs", 2, 3)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("require", 1, 2)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("requirejs", 1, 2)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("require", 1, 2)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: true }],
            errors: [makeTooManyParamsError("requirejs", 1, 2)]
        },

        // Extra dependencies (invalid since option not specified)
        {
            code: fixtures.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        },

        // Extra dependencies (invalid since option set to false)
        {
            code: fixtures.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: false }],
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        },

        // Extra dependencies (invalid since allowed paths are not the extra dependencies)
        {
            code: fixtures.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("define", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("require", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("requirejs", 2, 1)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("require", 1, 0)]
        },
        {
            code: fixtures.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK,
            options: [{ allowExtraDependencies: ["x", "y"] }],
            errors: [makeTooFewParamsError("requirejs", 1, 0)]
        }
    ]

});
