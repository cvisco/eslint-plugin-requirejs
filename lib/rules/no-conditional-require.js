/**
 * @fileoverview Disallow use of conditional `require` calls
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("../util");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Conditional `require` calls are not allowed.";
    var condStack = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if we are currently inside of a conditional.
     *
     * @private
     * @return {Boolean} true if inside at least one conditional
     */
    function isInsideConditional() {
        return condStack.length > 0;
    }

    /**
     * Add provided conditional `node` to the stack.
     *
     * @private
     * @param {ASTNode} node - ConditionalExpression or IfStatement node
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
     */
    function popConditional(node) {
        var len = condStack.length;

        if (len && condStack[len - 1] === node) {
            condStack.pop();
        }
    }

    //------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------

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

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
