/**
 * @fileoverview Disallow use of `exports` in a module definition when using Simplified CommonJS Wrapper
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

    var MESSAGE = "Unexpected use of `exports` in module definition.";
    var fnStack = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if supplied `node` represents an assignment to a property of
     * the `exports` object.
     *
     * @private
     * @param  {ASTNode} node - AssignmentExpression node to test
     * @return {Boolean} true if represents assignment to property of `exports`
     */
    function isExportsPropertyAssignment(node) {
        return node.left.type === "MemberExpression" &&
               node.left.object.name === "exports";
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "FunctionExpression": function (node) {
            fnStack.push(util.isDefineCall(node.parent) && util.isCommonJsWrapper(node.parent));
        },

        "FunctionExpression:exit": function () {
            fnStack.pop();
        },

        "AssignmentExpression": function (node) {
            if (isExportsPropertyAssignment(node) && util.isInsideModuleDef(fnStack)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
