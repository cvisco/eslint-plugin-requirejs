/**
 * @file    Tests for `no-conditional-require` rule
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const testRule = require("../../rule-tester");
const fixtures = require("../../fixtures");
const rule = require("../../../lib/rules/no-conditional-require");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR = {
    message: "Conditional `require` calls are not allowed.",
    type: "CallExpression"
};

testRule("no-conditional-require", rule, {

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
        fixtures.NESTED_AMD_REQUIREJS,
        fixtures.NESTED_AMD_REQUIRE_NO_CALLBACK,
        fixtures.NESTED_AMD_REQUIREJS_NO_CALLBACK,
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
