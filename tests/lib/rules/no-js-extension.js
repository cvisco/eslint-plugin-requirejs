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
        fixtures.NAMED_CJS_DEFINE
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
