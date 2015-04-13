/**
 * @fileoverview Disallow use of `module.exports` in a module definition when using Simplified CommonJS Wrapper
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

    var MESSAGE = "Unexpected use of `module.exports` in module definition.";
    var functions = [];


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isModuleExportsAssignment(node) {
        return node.left.type === "MemberExpression" &&
               node.left.object.name === "module" &&
               node.left.property.name === "exports";
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
            if (helpers.currentFnIsModuleDef(functions) && isModuleExportsAssignment(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

