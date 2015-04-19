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

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    // Always Invalid
    EMPTY_DEFINE: read("./EMPTY_DEFINE"),
    BAD_DEFINE: read("./BAD_DEFINE"),
    MULTIPLE_DEFINE: read("./MULTIPLE_DEFINE"),

    // Valid unless disabled
    OBJECT_DEFINE: read("./OBJECT_DEFINE"),
    FUNCTION_DEFINE: read("./FUNCTION_DEFINE"),
    AMD_DEFINE: read("./AMD_DEFINE"),
    AMD_EMPTY_DEFINE: read("./AMD_EMPTY_DEFINE"),
    CJS_WITH_RETURN: read("./CJS_WITH_RETURN"),
    CJS_WITH_EXPORTS: read("./CJS_WITH_EXPORTS"),
    CJS_WITH_MODULE_EXPORTS: read("./CJS_WITH_MODULE_EXPORTS"),
    CJS_WITH_FUNC_EXPR: read("./CJS_WITH_FUNC_EXPR"),
    CJS_WITH_INVALID_EXPORTS: read("./CJS_WITH_INVALID_EXPORTS"),
    NON_WRAPPED_EXPORTS: read("./NON_WRAPPED_EXPORTS"),
    NAMED_AMD_DEFINE: read("./NAMED_AMD_DEFINE"),
    NAMED_AMD_EMPTY_DEFINE: read("./NAMED_AMD_EMPTY_DEFINE"),
    NAMED_FUNCTION_DEFINE: read("./NAMED_FUNCTION_DEFINE"),
    NAMED_OBJECT_DEFINE: read("./NAMED_OBJECT_DEFINE"),
    NAMED_CJS_DEFINE: read("./NAMED_CJS_DEFINE"),
    AMD_REQUIRE: read("./AMD_REQUIRE"),
    AMD_EMPTY_REQUIRE: read("./AMD_EMPTY_REQUIRE"),
    DYNAMIC_MIXED_AMD_REQUIRE: read("./DYNAMIC_MIXED_AMD_REQUIRE"),
    DYNAMIC_TERNARY_AMD_REQUIRE: read("./DYNAMIC_TERNARY_AMD_REQUIRE"),
    DYNAMIC_VARIABLE_AMD_REQUIRE: read("./DYNAMIC_VARIABLE_AMD_REQUIRE"),
    DYNAMIC_TERNARY_CJS_REQUIRE: read("./DYNAMIC_TERNARY_CJS_REQUIRE"),
    DYNAMIC_VARIABLE_CJS_REQUIRE: read("./DYNAMIC_VARIABLE_CJS_REQUIRE"),
    CONDITIONAL_AMD_REQUIRE: read("./CONDITIONAL_AMD_REQUIRE"),
    CONDITIONAL_CJS_REQUIRE: read("./CONDITIONAL_CJS_REQUIRE")
};
