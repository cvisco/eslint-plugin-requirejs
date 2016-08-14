/**
 * @fileoverview Rule to disallow assignment to `require` or `window.require`
 * @author Casey Visco
 */

"use strict";

const isIdentifier = require("../utils/ast").isIdentifier;
const isMemberExpr = require("../utils/ast").isMemberExpr;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Determine if supplied `node` represents a `require` identifier
 * @private
 * @param {ASTNode} node - node to test
 * @returns {Boolean} true if `require` identifier
 */
function isRequireIdentifier(node) {
    return isIdentifier(node) && node.name === "require";
}

/**
 * Determine if supplied `node` represents a `window` identifier
 * @private
 * @param {ASTNode} node - node to test
 * @returns {Boolean} true if `window` identifier
 */
function isWindowIdentifier(node) {
    return isIdentifier(node) && node.name === "window";
}

/**
 * Determine if supplied `node` represents a `window.require`
 * MemberExpression.
 * @private
 * @param {ASTNode} node - node to test
 * @returns {Boolean} true if represents `window.require` expression
 */
function isWindowRequireExpr(node) {
    return isMemberExpr(node) &&
           isWindowIdentifier(node.object) &&
           isRequireIdentifier(node.property);
}

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const ERROR_MSG = "Invalid assignment to `require`.";

module.exports = {
    meta: {
        docs: {
            description: "Disallow assignment to `require` or `window.require`",
            category: "Stylistic Choices",
            recommended: false
        },
        schema: []
    },

    create: function (context) {
        return {
            "AssignmentExpression": function (node) {
                if (isRequireIdentifier(node.left) || isWindowRequireExpr(node.left)) {
                    context.report(node, ERROR_MSG);
                }
            },

            "VariableDeclarator": function (node) {
                if (isRequireIdentifier(node.id)) {
                    context.report(node, ERROR_MSG);
                }
            }
        };
    }
};
