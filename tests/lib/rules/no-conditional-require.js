/**
 * @fileoverview Tests for `no-conditional-require` rule
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
    message: "Conditional `require` calls are not allowed.",
    type: "CallExpression"
};


var eslintTester = new ESLintTester(eslint.linter);

eslintTester.addRuleTest("lib/rules/no-conditional-require", {

    valid: [
        fixtures.AMD_REQUIRE,
        fixtures.AMD_REQUIRE_RELATIVE,
        fixtures.AMD_EMPTY_REQUIRE,
        fixtures.AMD_REQUIRE_WITH_ERRBACK,
        fixtures.AMD_REQUIREJS,
        fixtures.AMD_REQUIREJS_RELATIVE,
        fixtures.AMD_EMPTY_REQUIREJS,
        fixtures.AMD_REQUIREJS_WITH_ERRBACK,
        fixtures.NESTED_AMD_REQUIRE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.CJS_WITH_MODULE_EXPORTS,
        fixtures.NAMED_CJS_DEFINE,
        fixtures.DYNAMIC_MIXED_AMD_REQUIRE,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIRE,
        fixtures.DYNAMIC_TERNARY_CJS_REQUIRE,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIRE,
        fixtures.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK,
        fixtures.DYNAMIC_MIXED_AMD_REQUIREJS,
        fixtures.DYNAMIC_TERNARY_AMD_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_AMD_REQUIREJS,
        fixtures.DYNAMIC_TERNARY_CJS_REQUIREJS,
        fixtures.DYNAMIC_VARIABLE_CJS_REQUIREJS,
        fixtures.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK
    ],

    invalid: [
        { code: fixtures.CONDITIONAL_AMD_REQUIRE, errors: [ERROR] },
        { code: fixtures.CONDITIONAL_CJS_REQUIRE, errors: [ERROR] },
        { code: fixtures.CONDITIONAL_TERNARY_CJS_REQUIRE, errors: [ERROR, ERROR] },
        { code: fixtures.CONDITIONAL_NESTED_AMD_REQUIRE, errors: [ERROR] },
        { code: fixtures.CONDITIONAL_AMD_REQUIREJS, errors: [ERROR] },
        { code: fixtures.CONDITIONAL_CJS_REQUIREJS, errors: [ERROR] },
        { code: fixtures.CONDITIONAL_TERNARY_CJS_REQUIREJS, errors: [ERROR, ERROR] },
        { code: fixtures.CONDITIONAL_NESTED_AMD_REQUIREJS, errors: [ERROR] }
    ]

});
