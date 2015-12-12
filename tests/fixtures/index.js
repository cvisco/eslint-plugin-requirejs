"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require("fs");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function read(path) {
    var filename = require.resolve(path);
    return fs.readFileSync(filename, "utf8");
}

function branch(obj, key) {
    obj[key] = obj[key] || {};
    return obj[key];
}

function loadFixture(path) {
    var parts = path
        .replace("./", "")
        .replace(".js", "")
        .split("/");

    var leaf = parts.pop();

    parts.reduce(branch, exports)[leaf] = read(path);
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

[
    "./amd/deps/none.js",
    "./amd/deps/single_line/one.js",
    "./amd/deps/single_line/two.js",
    "./amd/deps/single_line/three.js",
    "./amd/deps/single_line/four.js",
    "./amd/deps/multi_line/one.js",
    "./amd/deps/multi_line/two.js",
    "./amd/deps/multi_line/three.js",
    "./amd/deps/multi_line/four.js",
    "./amd/deps/multi_line_paths/one.js",
    "./amd/deps/multi_line_paths/two.js",
    "./amd/deps/multi_line_paths/three.js",
    "./amd/deps/multi_line_paths/four.js",
    "./amd/deps/multi_line_names/one.js",
    "./amd/deps/multi_line_names/two.js",
    "./amd/deps/multi_line_names/three.js",
    "./amd/deps/multi_line_names/four.js",

    // Always Invalid
    "./EMPTY_DEFINE",
    "./BAD_DEFINE",
    "./MULTIPLE_DEFINE",

    // Valid unless disabled
    "./OBJECT_DEFINE",
    "./FUNCTION_DEFINE",
    "./AMD_DEFINE",
    "./AMD_EMPTY_DEFINE",
    "./CJS_WITH_RETURN",
    "./CJS_WITH_NESTED_RETURNS",
    "./CJS_WITH_EXPORTS",
    "./CJS_WITH_MODULE_EXPORTS",
    "./CJS_WITH_FUNC_EXPR",
    "./CJS_WITH_INVALID_EXPORTS",
    "./NON_WRAPPED_EXPORTS",
    "./NAMED_AMD_DEFINE",
    "./NAMED_AMD_EMPTY_DEFINE",
    "./NAMED_FUNCTION_DEFINE",
    "./NAMED_OBJECT_DEFINE",
    "./NAMED_CJS_DEFINE",
    "./AMD_REQUIRE",
    "./AMD_EMPTY_REQUIRE",
    "./AMD_REQUIRE_WITH_ERRBACK",
    "./AMD_REQUIRE_RELATIVE",
    "./AMD_REQUIREJS",
    "./AMD_EMPTY_REQUIREJS",
    "./AMD_REQUIREJS_WITH_ERRBACK",
    "./AMD_REQUIREJS_RELATIVE",
    "./NESTED_AMD_REQUIRE",
    "./NESTED_AMD_REQUIRE_NO_CALLBACK",
    "./NESTED_AMD_REQUIREJS",
    "./NESTED_AMD_REQUIREJS_NO_CALLBACK",
    "./DECLARE_REQUIRE",
    "./ASSIGN_TO_REQUIRE",
    "./ASSIGN_TO_FOO_REQUIRE",
    "./ASSIGN_TO_WINDOW_REQUIRE",
    "./DYNAMIC_MIXED_AMD_REQUIRE",
    "./DYNAMIC_TERNARY_AMD_REQUIRE",
    "./DYNAMIC_VARIABLE_AMD_REQUIRE",
    "./DYNAMIC_TERNARY_CJS_REQUIRE",
    "./DYNAMIC_VARIABLE_CJS_REQUIRE",
    "./DYNAMIC_AMD_REQUIRE_WITH_ERRBACK",
    "./DYNAMIC_MIXED_AMD_REQUIREJS",
    "./DYNAMIC_TERNARY_AMD_REQUIREJS",
    "./DYNAMIC_VARIABLE_AMD_REQUIREJS",
    "./DYNAMIC_TERNARY_CJS_REQUIREJS",
    "./DYNAMIC_VARIABLE_CJS_REQUIREJS",
    "./DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK",
    "./CONDITIONAL_AMD_REQUIRE",
    "./CONDITIONAL_CJS_REQUIRE",
    "./CONDITIONAL_TERNARY_CJS_REQUIRE",
    "./CONDITIONAL_NESTED_AMD_REQUIRE",
    "./CONDITIONAL_AMD_REQUIREJS",
    "./CONDITIONAL_CJS_REQUIREJS",
    "./CONDITIONAL_TERNARY_CJS_REQUIREJS",
    "./CONDITIONAL_NESTED_AMD_REQUIREJS",
    "./REQUIRE_TO_URL",
    "./REQUIRE_NAME_TO_URL",
    "./REQUIREJS_TO_URL",
    "./REQUIREJS_NAME_TO_URL",
    "./AMD_DEFINE_WITH_JS_EXT",
    "./AMD_REQUIRE_WITH_JS_EXT",
    "./AMD_REQUIREJS_WITH_JS_EXT",
    "./AMD_REQUIRE_RELATIVE_WITH_JS_EXT",
    "./CJS_WITH_JS_EXT",
    "./NAMED_AMD_DEFINE_WITH_JS_EXT",
    "./NAMED_CJS_DEFINE_WITH_JS_EXT",
    "./BAD_REQUIRE_EMPTY",
    "./BAD_REQUIRE_TOO_MANY_ARGS",
    "./BAD_REQUIRE_NO_DEPS",
    "./BAD_REQUIRE_OBJECT",
    "./BAD_REQUIRE_STRING_DEP",
    "./BAD_REQUIREJS_STRING_DEP",
    "./BAD_REQUIRE_INVALID_CALLBACK",
    "./BAD_REQUIRE_INVALID_ERRBACK",
    "./UNWRAPPED_FILE",
    "./UNWRAPPED_FILE_NO_EXPRESSIONSTATEMENT",

    // Edge cases that are valid
    "./MULTIPLE_DEFINE_ONE_CALL"
].forEach(loadFixture);
