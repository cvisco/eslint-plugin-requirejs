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
    // Public
    //--------------------------------------------------------------------------

    return {

        "FunctionExpression": function (node) {
            var parent = node.parent,
                isDefineCall = parent.type === "CallExpression" && parent.callee.name === "define";

            functions.push({
                isModuleDef: isDefineCall && helpers.isCommonJsDef(parent.arguments)
            });
        },

        "FunctionExpression:exit": function () {
            functions.pop();
        },

        "MemberExpression": function (node) {
            var currentFunction = functions[functions.length - 1];

            if (currentFunction.isModuleDef && node.object.name === "exports") {
                context.report(node, MESSAGE);
            }
        }
    };

};

