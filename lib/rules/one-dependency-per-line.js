/**
 * @fileoverview Require or disallow one dependency per line.
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var unique = require("../utils/unique");
var repeat = require("../utils/repeat");
var isDefineCall = require("../util").isDefineCall;
var isRequireCall = require("../util").isRequireCall;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var ALWAYS_PATHS_MESSAGE = "Only one dependency path is permitted per line.";
    var ALWAYS_NAMES_MESSAGE = "Only one dependency name is permitted per line.";
    var NEVER_PATHS_MESSAGE = "Dependency paths must appear on one line.";
    var NEVER_NAMES_MESSAGE = "Dependency names must appear on one line.";

    var options = context.options[0] || {};

    var settings = {
        paths: "paths" in options ? options.paths : "always",
        names: "names" in options ? options.names : "always"
    };

    var sourceCode = context.getSourceCode();

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isArrayExpr(node) {
        return node.type === "ArrayExpression";
    }

    function isFunctionExpr(node) {
        return node.type === "FunctionExpression";
    }

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    function lineNum(node) {
        return node.loc.start.line;
    }

    function hasDuplicateValues(list) {
        return unique(list).length < list.length;
    }

    function hasMultipleValues(list) {
        return unique(list).length > 1;
    }

    function isAlways(setting, list) {
        var value = settings[setting];

        if (value === "always") {
            return true;
        }

        if (value === "never") {
            return false;
        }

        return list.length > value;
    }

    function isNever(setting) {
        return settings[setting] === "never";
    }

    function getFileIndentationLevel(args) {
        var functionLine = lineNum(args[1]);
        var firstStatementLine = lineNum(args[1].body.body[0]);

        if (functionLine !== firstStatementLine) {
            return args[1].body.body[0].loc.start.column;
        }
        return 0;
    }

    function getPathsFixer(args) {
        return function (fixer) {
            var indentLevel = isFunctionExpr(args[1]) ? getFileIndentationLevel(args) : 0;
            var replacerText = "";

            var pathsNode = args[0];

            var paths = pathsNode.elements;
            var formattedPaths = "";

            paths.map(function (path) {
                formattedPaths += repeat(indentLevel, " ") + path.raw + ",\n";
            });

            formattedPaths = formattedPaths.slice(0, -2);
            replacerText = "[\n" + formattedPaths + "\n]";

            return fixer.replaceTextRange(pathsNode.range, replacerText);
        };
    }

    function getNamesFixer(args) {
        return function (fixer) {
            var indentLevel = isFunctionExpr(args[1]) ? getFileIndentationLevel(args) : 0;
            var replacerText = "";

            var namesNode = args[1];

            var names = namesNode.params;
            var formattedNames = "";

            names.map(function (name) {
                formattedNames += repeat(indentLevel, " ") + name.name + ",\n";
            });

            formattedNames = formattedNames.slice(0, -2);
            replacerText += "function (\n" + formattedNames + "\n)";
            replacerText += " " + sourceCode.getText(namesNode.body);

            return fixer.replaceTextRange(namesNode.range, replacerText);
        };
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            var args = node.arguments,
                paths = [],
                names = [];


            if (!(isDefineCall(node) || isRequireCall(node)) || args.length < 2) {
                return;
            }

            // Remove named module id if present
            if (isDefineCall(node) && isStringLiteral(args[0])) {
                args = args.slice(1);
            }

            // Get dependency path list
            if (isArrayExpr(args[0])) {
                paths = args[0].elements;
            } else if (isRequireCall(node) && isStringLiteral(args[0])) {
                paths = [ args[0] ];
            } else {
                return;
            }

            // Get dependency alias list
            if (isFunctionExpr(args[1])) {
                names = args[1].params;
            }

            var pathsLineNums = paths.map(lineNum);
            var namesLineNums = names.map(lineNum);

            if (isAlways("paths", pathsLineNums) && hasDuplicateValues(pathsLineNums)) {
                context.report({node: node, message: ALWAYS_PATHS_MESSAGE, fix: getPathsFixer(args, pathsLineNums)});
            } else if (isNever("paths") && hasMultipleValues(pathsLineNums)) {
                context.report(node, NEVER_PATHS_MESSAGE);
            }

            if (isAlways("names", namesLineNums) && hasDuplicateValues(namesLineNums)) {
                context.report({node: node, message: ALWAYS_NAMES_MESSAGE, fix: getNamesFixer(args, namesLineNums)});
            } else if (isNever("names") && hasMultipleValues(namesLineNums)) {
                context.report(node, NEVER_NAMES_MESSAGE);
            }

        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [
    {
        "type": "object",
        "properties": {
            "paths": {
                "oneOf": [
                    {
                        "enum": ["always", "never"]
                    },
                    {
                        "type": "number",
                        "minimum": 0
                    }
                ]
            },
            "names": {
                "oneOf": [
                    {
                        "enum": ["always", "never"]
                    },
                    {
                        "type": "number",
                        "minimum": 0
                    }
                ]
            }
        },
        "additionalProperties": false
    }
];
