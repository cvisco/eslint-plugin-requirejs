/**
 * @fileoverview Build file. Based in large part on functionality found in
 *               eslint's own makefile, with necessary tweaks for building an
 *               eslint plugin instead.
 *
 * @author Casey Visco
 */

"use strict";

/* global cat */
/* global echo */
/* global exec */
/* global exit */
/* global find */
/* global mv */
/* global rm */
/* global target */
/* global test */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require("shelljs/make");

var path = require("path");
var semver = require("semver");
var dateformat = require("dateformat");
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

/**
 * Execute a command and return the output instead of printing it to stdout.
 *
 * @private
 * @param  {String} cmd - command to execute
 * @return {String} result of executed command
 */
function execSilent(cmd) {
    return exec(cmd, { silent: true }).output;
}

/**
 * Push supplied `tag` to supplied `list` only if it is a valid semver. This is
 * a reducer function.
 *
 * @private
 * @param  {Array}  list - array of valid semver tags
 * @param  {String} tag  - tag to push if valid
 * @return {Array}  modified `list`
 */
function validSemverTag(list, tag) {
    if (semver.valid(tag)) {
        list.push(tag);
    }

    return list;
}

function getVersionTags() {
    return execSilent("git tag")
        .trim()
        .split("\n")
        .reduce(validSemverTag, [])
        .sort(semver.compare);
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

/**
 * Verify that each rule is defined in index.js with the correct default
 * setting, has documentation and has tests.
 */
target.checkRules = function () {
    echo("Verifying rules");

    var errors = 0;

    var ruleFiles = find("lib/rules/").filter(fileType("js"));
    var configFile = require("./index");
    var readmeText = cat("./README.md");

    function isDefinedInConfig(rule) {
        return configFile.rules.hasOwnProperty(rule);
    }

    function hasDefaultSettingInConfig(rule) {
        var setting = configFile.rulesConfig[rule];

        return typeof setting === "number" ||
               (setting && typeof setting[0] === "number");
    }

    function isOffInConfig(rule) {
        var setting = configFile.rulesConfig[rule];

        return setting === 0 || (setting && setting[0] === 0);
    }

    function isOnInConfig(rule) {
        return !isOffInConfig(rule);
    }

    function isOffInReadme(rule) {
        var line = new RegExp("\\* \\[" + rule + "\\].*").exec(readmeText);

        return (line ? line[0] : "").indexOf("(off by default)") !== -1;
    }

    function isOnInReadme(rule) {
        return !isOffInReadme(rule);
    }

    function hasIdInTitle(docFile, id) {
        var docText = cat(docFile);
        var idInTitleRegExp = new RegExp("^# (.*?) \\(" + id + "\\)");

        return idInTitleRegExp.test(docText);
    }

    ruleFiles.forEach(function (filename) {
        var basename = path.basename(filename, ".js");
        var docFilename = "docs/rules/" + basename + ".md";
        var testFilename = "tests/lib/rules/" + basename + ".js";

        // Verify rule has documentation

        if (!test("-f", docFilename)) {
            console.error("Missing documentation for rule %s", basename);
            errors++;
        } else {
            if (readmeText.indexOf("(" + docFilename + ")") === -1) {
                console.error("Missing link to documentation for rule %s in index", basename);
                errors++;
            }

            // check for proper doc format
            if (!hasIdInTitle(docFilename, basename)) {
                console.error("Missing id in the doc page's title of rule %s", basename);
                errors++;
            }
        }

        // Verify rule has tests

        if (!test("-f", testFilename)) {
            console.error("Missing tests for rule %s", basename);
            errors++;
        }

        // Verify config

        if (!isDefinedInConfig(basename)) {
            console.error("Missing rule entry for %s in index.js", basename);
            errors++;
        }

        if (!hasDefaultSettingInConfig(basename)) {
            console.error("Missing default setting for %s in index.js", basename);
            errors++;
        }

        if (isOffInReadme(basename) && isOnInConfig(basename)) {
            console.error("README states that %s is off by default, but it is enabled in index.js.", basename);
            errors++;
        }

        if (isOffInConfig(basename) && isOnInReadme(basename)) {
            console.error("Missing '(off by default)' for rule %s in README", basename);
            errors++;
        }
    });

    if (errors) {
        exit(1);
    }
};

target.test = function () {
    var errors = 0;

    target.lint();
    target.checkRules();

    echo("Running test suite");

    errors += nodeCLI.exec("istanbul", "cover", MOCHA, "-- -R progress -t 3000 -c", TEST_FILES).code;
    errors += nodeCLI.exec("istanbul", "check-coverage", "--statement 100 --branch 95 --function 100 --lines 100").code;

    if (errors) {
        exit(1);
    }
};

target.changelog = function () {

    // get most recent two tags
    var tags = getVersionTags(),
        rangeTags = tags.slice(tags.length - 2),
        timestamp = dateformat(new Date(), "mmmm d, yyyy"),
        semverRe = /^\* \d\.\d.\d/;

    // output header
    ("### " + rangeTags[1] + " - " + timestamp + "\n").to("CHANGELOG.tmp");

    // get log statements
    var logs = execSilent("git log --pretty=format:\"* %s (%an)\" " + rangeTags.join("..")).split(/\n/g);

    logs = logs.filter(function (line) {
        return line.indexOf("Merge pull request") === -1 &&
               line.indexOf("Merge branch") === -1 &&
               !semverRe.test(line);
    });

    logs.push(""); // to create empty lines
    logs.unshift("");

    // output log statements
    logs.join("\n").toEnd("CHANGELOG.tmp");

    cat("CHANGELOG.tmp", "CHANGELOG.md").to("CHANGELOG.md.tmp");
    rm("CHANGELOG.tmp");
    rm("CHANGELOG.md");
    mv("CHANGELOG.md.tmp", "CHANGELOG.md");
};
