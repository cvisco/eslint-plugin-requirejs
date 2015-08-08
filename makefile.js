"use strict";

/* global echo */
/* global exec */
/* global exit */
/* global find */
/* global target */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require("shelljs/make");

var nodeCLI = require("shelljs-nodecli");

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

// Tools
var ESLINT = "./node_modules/.bin/eslint ";
var MOCHA = "./node_modules/mocha/bin/_mocha ";

// Files
var MAKEFILE = "./makefile.js";
var JS_FILES = find("lib/").filter(fileType("js")).join(" ");
var TEST_FILES = find("tests/lib/").filter(fileType("js")).join(" ");


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Generate a function that matches files with a particular extension.
 *
 * @private
 * @param  {String}   extension - the file extension (i.e. "js")
 * @return {Function} function to pass into a filter method
 */
function fileType(extension) {
    return function (filename) {
        return filename.substring(filename.lastIndexOf(".") + 1) === extension;
    };
}

//------------------------------------------------------------------------------
// Tasks
//------------------------------------------------------------------------------

target.lint = function () {
    var errors = 0;

    echo("Linting makefile");
    errors += exec(ESLINT + MAKEFILE).code;

    echo("Linting JavaScript files");
    errors += exec(ESLINT + JS_FILES).code;

    echo("Linting JavaScript test files");
    errors += exec(ESLINT + TEST_FILES).code;

    if (errors) {
        exit(1);
    }
};

target.test = function () {
    var errors = 0;

    target.lint();

    echo("Running test suite");

    errors += nodeCLI.exec("istanbul", "cover", MOCHA, "-- -R progress -t 3000 -c", TEST_FILES).code;
    errors += nodeCLI.exec("istanbul", "check-coverage", "--statement 100 --branch 95 --function 100 --lines 100").code;

    if (errors) {
        exit(1);
    }
};
