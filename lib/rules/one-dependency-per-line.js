/**
 * @fileoverview Rule to enforce or disallow one dependency per line.
 * @author Casey Visco
 */

"use strict";

const util = require("../util");
const ast = require("../utils/ast");

const isDefineCall = util.isDefineCall;
const isRequireCall = util.isRequireCall;
const isArrayExpr = ast.isArrayExpr;
const isFunctionExpr = ast.isFunctionExpr;
const isStringLiteral = ast.isStringLiteral;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const pad = (amount) => (value) => " ".repeat(amount) + value;
const line = (node) => node.loc.start.line;
const column = (node) => node.loc.start.column;
const unique = (list) => Array.from(new Set(list));
const hasDuplicates = (list) => unique(list).length < list.length;
const hasMultiple = (list) => unique(list).length > 1;

const indentation = (node) => {
    const statement = node.body.body[0];
    return statement && line(node) !== line(statement) ? column(statement) : 0;
};

const formatPaths = (indent) => (node) => {
    const paths = node.elements
        .map(v => v.raw)
        .map(pad(indent))
        .join(",\n");

    return `[\n${paths}\n]`;
};

const formatNames = (indent, context) => (node) => {
    const body = context.getSourceCode().getText(node.body);
    const names = node.params
        .map(v => v.name)
        .map(pad(indent))
        .join(",\n");

    return `function (\n${names}\n) ${body}`;
};

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const ALWAYS_MSG = {
    paths: "Only one dependency path is permitted per line.",
    names: "Only one dependency name is permitted per line."
};

const NEVER_MSG = {
    paths: "Dependency paths must appear on one line.",
    names: "Dependency names must appear on one line."
};

module.exports = {
    meta: {
        docs: {
            description: "Require or disallow one dependency per line",
            category: "Stylistic Choices",
            recommended: false
        },
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
        const options = context.options[0] || {};

        const settings = {
            paths: "paths" in options ? options.paths : "always",
            names: "names" in options ? options.names : "always"
        };

        function isAlways(setting, list) {
            const value = settings[setting];
            switch (value) {
                case "always":
                    return true;
                case "never":
                    return false;
                default:
                    return list.length > value;
            }
        }

        function isNever(setting) {
            return settings[setting] === "never";
        }

        function check(setting, node, list, format) {
            const lines = list.map(line);
            const fix = (fixer) => fixer.replaceTextRange(node.range, format(node));

            if (isAlways(setting, lines) && hasDuplicates(lines)) {
                context.report({ node, fix, message: ALWAYS_MSG[setting] });
            } else if (isNever(setting) && hasMultiple(lines)) {
                context.report({ node, message: NEVER_MSG[setting] });
            }
        }

        return {
            "CallExpression": function (node) {
                let args = node.arguments;

                if (!isDefineCall(node) && !isRequireCall(node) || args.length < 2) {
                    return;
                }

                // Remove named module id if present
                if (isDefineCall(node) && isStringLiteral(args[0])) {
                    args = args.slice(1);
                }

                const deps = args[0];
                const func = args[1];

                // We can only work with valid AMD-Style require or define calls
                if (!isArrayExpr(deps) || !isFunctionExpr(func)) {
                    return;
                }

                const indent = indentation(args[1]);

                check("paths", deps, deps.elements, formatPaths(indent));
                check("names", func, func.params, formatNames(indent, context));
            }
        };
    }
};
