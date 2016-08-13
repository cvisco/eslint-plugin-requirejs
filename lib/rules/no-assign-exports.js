/**
 * @fileoverview Disallow assignment to `exports` when using Simplified CommonJS Wrapper
 * @author Casey Visco
 */

"use strict";

var util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Invalid assignment to `exports`.";
        var fnStack = [];

        /**
         * Determine if supplied `node` represents an assignment to `exports`.
         *
         * @private
         * @param  {ASTNode} node - AssignmentExpression node to test
         * @returns {Boolean} true if represents assignment to `exports`
         */
        function isExportsAssignment(node) {
            return node.left.type === "Identifier" &&
                   node.left.name === "exports";
        }

        return {
            "FunctionExpression": function (node) {
                fnStack.push(util.isDefineCall(node.parent) && util.isCommonJsWrapper(node.parent));
            },

            "FunctionExpression:exit": function () {
                fnStack.pop();
            },

            "AssignmentExpression": function (node) {
                if (isExportsAssignment(node) && util.isInsideModuleDef(fnStack)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
