/**
 * @fileoverview Disallow use of `return` statement in a module definition when using Simplified CommonJS Wrapper
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

    var MESSAGE = "Unexpected `return` in module definition.";
    var fnStack = [];

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

        "ReturnStatement": function (node) {
            if (util.isInsideModuleDef(fnStack)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

