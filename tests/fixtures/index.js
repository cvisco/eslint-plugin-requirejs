"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require("fs");
var path = require("path");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function loadFixture(output, filename) {
    var key = path.basename(filename).replace(".js", "");
    output[key] = fs.readFileSync(filename, "utf8");
    return output;
}

function toResolvedPath(filename) {
    return path.resolve(__dirname, filename);
}

function excludeSelf(file) {
    return file !== path.basename(__filename);
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

fs.readdirSync(__dirname)
    .filter(excludeSelf)
    .map(toResolvedPath)
    .reduce(loadFixture, exports);
