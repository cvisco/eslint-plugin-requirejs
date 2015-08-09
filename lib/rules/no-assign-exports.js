/**
 * @fileoverview Disallow assignment to `exports` when using Simplified CommonJS Wrapper
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

    var MESSAGE = "Invalid assignment to `exports`.";
    var fnStack = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if supplied `node` represents an assignment to `exports`.
     *
     * @private
     * @param  {ASTNode} node - AssignmentExpression node to test
     * @return {Boolean} true if represents assignment to `exports`
     */
    function isExportsAssignment(node) {
        return node.left.type === "Identifier" &&
               node.left.name === "exports";
    }

    //------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------

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

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
