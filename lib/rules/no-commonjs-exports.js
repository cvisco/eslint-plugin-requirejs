/**
 * @fileoverview Disallow use of `exports` in a module definition when using Simplified CommonJS Wrapper
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var helpers = require("../helpers");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Unexpected use of `exports` in module definition.";
    var functions = [];


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isExportsAssignment(node) {
        return node.left.type === "MemberExpression" &&
               node.left.object.name === "exports";
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "FunctionExpression": function (node) {
            functions.push({
                isModuleDef: helpers.isDefineCall(node.parent) && helpers.isCommonJsDef(node.parent.arguments)
            });
        },

        "FunctionExpression:exit": function () {
            functions.pop();
        },

        "AssignmentExpression": function (node) {
            if (helpers.currentFnIsModuleDef(functions) && isExportsAssignment(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

