/**
 * @fileoverview Disallow use of `module.exports` in a module definition when using Simplified CommonJS Wrapper
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
        const MESSAGE = "Unexpected use of `module.exports` in module definition.";
        const fnStack = [];

        /**
         * Determine if supplied `node` represents an assignment to `module.exports`
         *
         * @private
         * @param  {ASTNode} node - AssignmentExpression node to test
         * @returns {Boolean} true if represents assignment to `module.exports`
         */
        function isModuleExportsAssignment(node) {
            return node.left.type === "MemberExpression" &&
                   node.left.object.name === "module" &&
                   node.left.property.name === "exports";
        }

        return {
            "FunctionExpression": function (node) {
                fnStack.push(util.isDefineCall(node.parent) && util.isCommonJsWrapper(node.parent));
            },

            "FunctionExpression:exit": function () {
                fnStack.pop();
            },

            "AssignmentExpression": function (node) {
                if (isModuleExportsAssignment(node) && util.isInsideModuleDef(fnStack)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
