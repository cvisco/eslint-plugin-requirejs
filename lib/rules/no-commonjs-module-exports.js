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

    function isDefineCall(node) {
        return node.type === "CallExpression" &&
               node.callee.name === "define";
    }

    function currentScopeIsModuleDef() {
        var fnLength = functions.length;

        return fnLength && functions[fnLength - 1].isModuleDef;
    }

    function isModuleExportsAssignment(node) {
        return node.type === "MemberExpression" &&
               node.object.name === "module" &&
               node.property.name === "exports";
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "FunctionExpression": function (node) {
            functions.push({
                isModuleDef: isDefineCall(node.parent) && helpers.isCommonJsDef(node.parent.arguments)
            });
        },

        "FunctionExpression:exit": function () {
            functions.pop();
        },

        "AssignmentExpression": function (node) {
            if (currentScopeIsModuleDef() && isModuleExportsAssignment(node.left)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

