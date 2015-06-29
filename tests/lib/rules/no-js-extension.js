/**
 * @fileoverview Tests for `no-js-extension` rule
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
    message: "Don't use .js extension in dependency path.",
    type: "Literal"
};

var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-js-extension", {

    valid: [
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.AMD_EMPTY_REQUIRE,
        fixtures.AMD_EMPTY_REQUIREJS,
        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.AMD_REQUIRE_WITH_ERRBACK,
        fixtures.AMD_REQUIREJS,
        fixtures.AMD_REQUIREJS_RELATIVE,
        fixtures.AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.CJS_WITH_RETURN,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.NAMED_CJS_DEFINE,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.DYNAMIC_MIXED_AMD_REQUIRE,
        fixtures.DYNAMIC_MIXED_AMD_REQUIREJS,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIRE,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIREJS,
        fixtures.DYNAMIC_TERNARY_CJS_REQUIRE,
        fixtures.DYNAMIC_TERNARY_CJS_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIREJS,
        fixtures.CONDITIONAL_AMD_REQUIRE,
        fixtures.CONDITIONAL_AMD_REQUIREJS,
        fixtures.CONDITIONAL_CJS_REQUIRE,
        fixtures.CONDITIONAL_CJS_REQUIREJS,
        fixtures.CONDITIONAL_NESTED_AMD_REQUIRE,
        fixtures.CONDITIONAL_NESTED_AMD_REQUIREJS,
        fixtures.CONDITIONAL_TERNARY_CJS_REQUIRE,
        fixtures.CONDITIONAL_TERNARY_CJS_REQUIREJS
    ],

    invalid: [
        { code: fixtures.AMD_REQUIRE_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.AMD_REQUIREJS_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.AMD_REQUIRE_RELATIVE_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.AMD_DEFINE_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.CJS_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.NAMED_AMD_DEFINE_WITH_JS_EXT, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE_WITH_JS_EXT, errors: [ERROR] }
    ]

});
