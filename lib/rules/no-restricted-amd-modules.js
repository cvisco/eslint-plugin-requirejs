/**
 * @file    Rule to disallow specified modules when loaded by `define`
 * @author  Stefan Buck
 */

"use strict";

const ignore = require("ignore");
const rjs = require("../utils/rjs");

const isAmdDefine = rjs.isAmdDefine;
const isAmdRequire = rjs.isAmdRequire;
const getDependencyStringNodes = rjs.getDependencyStringNodes;

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const docs = {
    description: "Disallow specified modules when loaded by `define`",
    category: "Stylistic Choices",
    recommended: false,
    url:
        "https://github.com/cvisco/eslint-plugin-requirejs/blob/master/docs/rules/no-restricted-amd-modules.md"
};

const arrayOfStrings = {
    type: "array",
    items: { type: "string" },
    uniqueItems: true
};

const arrayOfStringsOrObjects = {
    type: "array",
    items: {
        anyOf: [
            { type: "string" },
            {
                type: "object",
                properties: {
                    name: { type: "string" },
                    message: {
                        type: "string",
                        minLength: 1
                    }
                },
                additionalProperties: false,
                required: ["name"]
            }
        ]
    },
    uniqueItems: true
};

const schema = {
    anyOf: [
        arrayOfStringsOrObjects,
        {
            type: "array",
            items: {
                type: "object",
                properties: {
                    paths: arrayOfStringsOrObjects,
                    patterns: arrayOfStrings
                },
                additionalProperties: false
            },
            additionalItems: false
        }
    ]
};

const DEFAULT_MESSAGE_TEMPLATE =
    "'{{moduleName}}' module is restricted from being used.";
const CUSTOM_MESSAGE_TEMPLATE =
    "'{{moduleName}}' module is restricted from being used. {{customMessage}}";

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

function create(context) {
    const options = Array.isArray(context.options) ? context.options : [];
    const isPathAndPatternsObject =
        typeof options[0] === "object" &&
        (Object.prototype.hasOwnProperty.call(options[0], "paths") ||
            Object.prototype.hasOwnProperty.call(options[0], "patterns"));

    const restrictedPaths =
        (isPathAndPatternsObject ? options[0].paths : options) || [];
    const restrictedPatterns =
        (isPathAndPatternsObject ? options[0].patterns : []) || [];

    const restrictedPathMessages = restrictedPaths.reduce(
        (memo, importName) => {
            if (typeof importName === "string") {
                memo[importName] = null;
            } else {
                memo[importName.name] = importName.message;
            }
            return memo;
        },
        {}
    );

    // if no modules are restricted we don"t need to check
    if (
        Object.keys(restrictedPaths).length === 0 &&
        restrictedPatterns.length === 0
    ) {
        return {};
    }

    const ig = ignore().add(restrictedPatterns);

    /**
     * Report a restricted path.
     * @param {node} node representing the restricted path reference
     * @returns {void}
     * @private
     */
    function reportPath(node) {
        const moduleName = node.value.trim();
        const customMessage = restrictedPathMessages[moduleName];
        const message = customMessage
            ? CUSTOM_MESSAGE_TEMPLATE
            : DEFAULT_MESSAGE_TEMPLATE;

        context.report({
            node,
            message,
            data: {
                moduleName,
                customMessage
            }
        });
    }

    /**
     * Check if the given name is a restricted path name
     * @param {string} name name of a variable
     * @returns {boolean} whether the variable is a restricted path or not
     * @private
     */
    function isRestrictedPath(name) {
        return Object.prototype.hasOwnProperty.call(
            restrictedPathMessages,
            name
        );
    }

    return {
        CallExpression(node) {
            if (!isAmdDefine(node) && !isAmdRequire(node)) return;

            const paths = getDependencyStringNodes(node);

            for (let i = 0; i < paths.length; i++) {
                const nodeCurrent = paths[i];
                const moduleName = nodeCurrent.value.trim();

                // check if argument value is in restricted modules array
                if (isRestrictedPath(moduleName)) {
                    reportPath(nodeCurrent);
                }

                if (restrictedPatterns.length > 0 && ig.ignores(moduleName)) {
                    context.report({
                        node,
                        message:
                            "'{{moduleName}}' module is restricted from being used by a pattern.",
                        data: { moduleName }
                    });
                    break;
                }
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
