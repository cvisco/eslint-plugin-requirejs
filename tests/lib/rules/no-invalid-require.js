/**
 * @fileoverview Tests for `no-invalid-require` rule
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
    message: "Invalid arguments provided to `require` call.",
    type: "CallExpression"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-invalid-require", {

    valid: [
        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.AMD_REQUIRE_WITH_ERRBACK,
        fixtures.AMD_REQUIREJS,
        fixtures.AMD_REQUIREJS_RELATIVE,
        fixtures.AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_RETURN,
        fixtures.CONDITIONAL_AMD_REQUIRE,
        fixtures.CONDITIONAL_AMD_REQUIREJS,
        fixtures.CONDITIONAL_CJS_REQUIRE,
        fixtures.CONDITIONAL_CJS_REQUIREJS,
        fixtures.CONDITIONAL_NESTED_AMD_REQUIRE,
        fixtures.CONDITIONAL_NESTED_AMD_REQUIREJS,
        fixtures.CONDITIONAL_TERNARY_CJS_REQUIRE,
        fixtures.CONDITIONAL_TERNARY_CJS_REQUIREJS,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.DYNAMIC_MIXED_AMD_REQUIRE,
        fixtures.DYNAMIC_MIXED_AMD_REQUIREJS,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIRE,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIREJS,
        fixtures.NESTED_AMD_REQUIRE,
        fixtures.NESTED_AMD_REQUIREJS,
        fixtures.NESTED_AMD_REQUIRE_NO_CALLBACK,
        fixtures.NESTED_AMD_REQUIREJS_NO_CALLBACK
    ],

    invalid: [
        { code: fixtures.BAD_REQUIRE_EMPTY, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_NO_DEPS, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_OBJECT, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_TOO_MANY_ARGS, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_STRING_DEP, errors: [ERROR] },
        { code: fixtures.BAD_REQUIREJS_STRING_DEP, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_INVALID_CALLBACK, errors: [ERROR] },
        { code: fixtures.BAD_REQUIRE_INVALID_ERRBACK, errors: [ERROR] }
    ]

});
