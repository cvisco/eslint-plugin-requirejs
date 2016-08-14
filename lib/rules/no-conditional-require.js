/**
 * @fileoverview Rule to disallow use of conditional `require` calls
 * @author Casey Visco
 */

"use strict";

const isRequireCall = require("../util").isRequireCall;
const ancestor = require("../utils/ast").ancestor;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Test if supplied `node` represents a conditional—either an `if` statement
 * or a ternary expression.
 * @private
 * @param {ASTNode} node - node to test
 * @returns {Boolean} true if node represents a conditional
 */
function isConditional(node) {
    return node.type === "IfStatement" ||
           node.type === "ConditionalExpression";
}

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const ERROR_MSG = "Conditional `require` calls are not allowed.";

module.exports = {
    meta: {
        docs: {
            description: "Disallow use of conditional `require` calls",
            category: "Stylistic Choices",
            recommended: true
        },
        schema: []
    },

    create: function (context) {
        return {
            "CallExpression": function (node) {
                if (isRequireCall(node) && ancestor(isConditional, node)) {
                    context.report(node, ERROR_MSG);
                }
            }
        };
    }
};
