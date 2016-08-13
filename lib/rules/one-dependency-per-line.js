/**
 * @fileoverview Require or disallow one dependency per line.
 * @author Casey Visco
 */

"use strict";

const unique = require("../utils/unique");
const util = require("../util");
const ast = require("../utils/ast");

const isDefineCall = util.isDefineCall;
const isRequireCall = util.isRequireCall;
const isArrayExpr = ast.isArrayExpr;
const isFunctionExpr = ast.isFunctionExpr;
const isStringLiteral = ast.isStringLiteral;

module.exports = {
    meta: {
        docs: {},
        fixable: "code",
        schema: [
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
        ]
    },

    create: function (context) {
        const ALWAYS_PATHS_MESSAGE = "Only one dependency path is permitted per line.";
        const ALWAYS_NAMES_MESSAGE = "Only one dependency name is permitted per line.";
        const NEVER_PATHS_MESSAGE = "Dependency paths must appear on one line.";
        const NEVER_NAMES_MESSAGE = "Dependency names must appear on one line.";

        const options = context.options[0] || {};

        const settings = {
            paths: "paths" in options ? options.paths : "always",
            names: "names" in options ? options.names : "always"
        };

        const sourceCode = context.getSourceCode();

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
            const value = settings[setting];

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
            const functionLine = lineNum(args[1]);
            const firstStatementLine = lineNum(args[1].body.body[0]);

            if (functionLine !== firstStatementLine) {
                return args[1].body.body[0].loc.start.column;
            }

            return 0;
        }

        function getPathsFixer(args) {
            return function (fixer) {
                const indentLevel = isFunctionExpr(args[1]) ? getFileIndentationLevel(args) : 0;
                const pathsNode = args[0];
                const paths = pathsNode.elements;
                let formattedPaths = "";

                paths.forEach(function (path) {
                    formattedPaths += " ".repeat(indentLevel) + path.raw + ",\n";
                });

                formattedPaths = formattedPaths.slice(0, -2);
                let replacerText = "[\n" + formattedPaths + "\n]";

                return fixer.replaceTextRange(pathsNode.range, replacerText);
            };
        }

        function getNamesFixer(args) {
            return function (fixer) {
                const indentLevel = isFunctionExpr(args[1]) ? getFileIndentationLevel(args) : 0;
                const namesNode = args[1];
                const names = namesNode.params;

                let replacerText = "";
                let formattedNames = "";

                names.forEach(function (name) {
                    formattedNames += " ".repeat(indentLevel) + name.name + ",\n";
                });

                formattedNames = formattedNames.slice(0, -2);
                replacerText += "function (\n" + formattedNames + "\n)";
                replacerText += " " + sourceCode.getText(namesNode.body);

                return fixer.replaceTextRange(namesNode.range, replacerText);
            };
        }

        return {
            "CallExpression": function (node) {
                let args = node.arguments;
                let paths = [];
                let names = [];

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

                const pathsLineNums = paths.map(lineNum);
                const namesLineNums = names.map(lineNum);

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
    }
};
