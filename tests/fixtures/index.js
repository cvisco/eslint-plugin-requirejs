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
    AMD_NAMED_DEFINE: read("./AMD_NAMED_DEFINE"),
    AMD_NAMED_EMPTY_DEFINE: read("./AMD_NAMED_EMPTY_DEFINE"),
    CJS_WITH_RETURN: read("./CJS_WITH_RETURN"),
    CJS_WITH_EXPORTS: read("./CJS_WITH_EXPORTS"),
    CJS_WITH_MODULE_EXPORTS: read("./CJS_WITH_MODULE_EXPORTS"),
    CJS_WITH_FUNC_EXPR: read("./CJS_WITH_FUNC_EXPR"),
    CJS_WITH_INVALID_EXPORTS: read("./CJS_WITH_INVALID_EXPORTS"),
    NON_WRAPPED_EXPORTS: read("./NON_WRAPPED_EXPORTS")

};
