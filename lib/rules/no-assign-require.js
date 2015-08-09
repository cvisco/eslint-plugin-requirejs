/**
 * @fileoverview Disallow assignment to `require` or `window.require`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Invalid assignment to `require`.";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if supplied `node` represents a `require` identifier
     *
     * @private
     * @param  {ASTNode} node - node to test
     * @return {Boolean} true if `require` identifier
     */
    function isRequireIdentifier(node) {
        return node.type === "Identifier" && node.name === "require";
    }

    /**
     * Determine if supplied `node` represents a `window` identifier
     *
     * @private
     * @param  {ASTNode} node - node to test
     * @return {Boolean} true if `window` identifier
     */
    function isWindowIdentifier(node) {
        return node.type === "Identifier" && node.name === "window";
    }

    /**
     * Determine if supplied `node` represents a `window.require`
     * MemberExpression.
     *
     * @private
     * @param  {ASTNode} node - node to test
     * @return {Boolean} true if represents `window.require` expression
     */
    function isWindowRequireExpr(node) {
        return node.type === "MemberExpression" &&
               isWindowIdentifier(node.object) &&
               isRequireIdentifier(node.property);
    }

    //------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------

    return {
        "AssignmentExpression": function (node) {
            if (isRequireIdentifier(node.left) || isWindowRequireExpr(node.left)) {
                context.report(node, MESSAGE);
            }
        },

        "VariableDeclarator": function (node) {
            if (isRequireIdentifier(node.id)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
