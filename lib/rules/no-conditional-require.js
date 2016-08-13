/**
 * @fileoverview Disallow use of conditional `require` calls
 * @author Casey Visco
 */

"use strict";

const util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Conditional `require` calls are not allowed.";
        const condStack = [];

        /**
         * Determine if we are currently inside of a conditional.
         *
         * @private
         * @returns {Boolean} true if inside at least one conditional
         */
        function isInsideConditional() {
            return condStack.length > 0;
        }

        /**
         * Add provided conditional `node` to the stack.
         *
         * @private
         * @param {ASTNode} node - ConditionalExpression or IfStatement node
         * @returns {void}
         */
        function pushConditional(node) {
            condStack.push(node);
        }

        /**
         * Remove provided conditional `node` from the stack if it is the last in
         * the list.
         *
         * @private
         * @param {ASTNode} node - ConditionalExpression or IfStatement node
         * @returns {void}
         */
        function popConditional(node) {
            const len = condStack.length;

            if (len && condStack[len - 1] === node) {
                condStack.pop();
            }
        }

        return {

            // Standard "If" block
            "IfStatement": pushConditional,
            "IfStatement:exit": popConditional,

            // Ternary Expression (?:)
            "ConditionalExpression": pushConditional,
            "ConditionalExpression:exit": popConditional,

            "CallExpression": function (node) {
                if (util.isRequireCall(node) && isInsideConditional()) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
