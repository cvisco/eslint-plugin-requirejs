/**
 * @fileoverview Disallow use of `return` statement in a module definition when using Simplified CommonJS Wrapper
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

    var MESSAGE = "Unexpected `return` in module definition.";
    var functions = [];

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

        "ReturnStatement": function (node) {
            if (helpers.currentFnIsModuleDef(functions)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

