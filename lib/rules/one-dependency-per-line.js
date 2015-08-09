/**
 * @fileoverview Require or disallow one dependency per line.
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var uniq = require("lodash.uniq");
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
        return uniq(list).length < list.length;
    }

    function hasMultipleValues(list) {
        return uniq(list).length > 1;
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

            paths = paths.map(lineNum);
            names = names.map(lineNum);

            if (isAlways("paths", paths) && hasDuplicateValues(paths)) {
                context.report(node, ALWAYS_PATHS_MESSAGE);
            } else if (isNever("paths") && hasMultipleValues(paths)) {
                context.report(node, NEVER_PATHS_MESSAGE);
            }

            if (isAlways("names", names) && hasDuplicateValues(names)) {
                context.report(node, ALWAYS_NAMES_MESSAGE);
            } else if (isNever("names") && hasMultipleValues(names)) {
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
