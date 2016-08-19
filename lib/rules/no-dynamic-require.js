/**
 * @fileoverview Rule to disallow dynamically generated paths in `require` call
 * @author Casey Visco
 */

"use strict";

const util = require("../util");
const ast = require("../utils/ast");

const isRequireCall = util.isRequireCall;
const isStringLiteral = ast.isStringLiteral;
const isStringLiteralArray = ast.isStringLiteralArray;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Determine if supplied `node` represents either a String literal or an Array
 * of String literals, indicating a static list of dependencies.
 * @private
 * @param {ASTNode} node - node to test
 * @returns {Boolean} true if node represents static dependencies
 */
function isStatic(node) {
    return isStringLiteral(node) || isStringLiteralArray(node);
}

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const ERROR_MSG = "Dynamic `require` calls are not allowed.";

module.exports = {
    meta: {
        docs: {
            description: "Disallow use of dynamically generated paths in a require call",
            category: "Stylistic Choices",
            recommended: false
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (isRequireCall(node) && !isStatic(node.arguments[0])) {
                    context.report(node, ERROR_MSG);
                }
            }
        };
    }
};
