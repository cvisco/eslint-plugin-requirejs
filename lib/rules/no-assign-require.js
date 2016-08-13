/**
 * @fileoverview Disallow assignment to `require` or `window.require`
 * @author Casey Visco
 */

"use strict";

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Invalid assignment to `require`.";

        /**
         * Determine if supplied `node` represents a `require` identifier
         *
         * @private
         * @param  {ASTNode} node - node to test
         * @returns {Boolean} true if `require` identifier
         */
        function isRequireIdentifier(node) {
            return node.type === "Identifier" && node.name === "require";
        }

        /**
         * Determine if supplied `node` represents a `window` identifier
         *
         * @private
         * @param  {ASTNode} node - node to test
         * @returns {Boolean} true if `window` identifier
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
         * @returns {Boolean} true if represents `window.require` expression
         */
        function isWindowRequireExpr(node) {
            return node.type === "MemberExpression" &&
                   isWindowIdentifier(node.object) &&
                   isRequireIdentifier(node.property);
        }

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
    }
};
