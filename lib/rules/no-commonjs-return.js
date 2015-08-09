/**
 * @fileoverview Disallow use of `return` statement in a module definition
 *               when using Simplified CommonJS Wrapper
 *
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var isDefineCall = require("../util").isDefineCall;
var isCommonJsWrapper = require("../util").isCommonJsWrapper;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Unexpected `return` in module definition.";
    var functions = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Mark entrance into a function by pushing a new object onto the functions
     * stack. Store whether function is the actual module definition.
     *
     * @private
     * @param {ASTNode} node - function node to store
     */
    function enterFunction(node) {
        var parent = node.parent;

        functions.push({
            isModuleDef: isDefineCall(parent) && isCommonJsWrapper(parent)
        });
    }

    /**
     * Mark exit of a function by popping it off the functions stack.
     *
     * @private
     */
    function exitFunction() {
        functions.pop();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": enterFunction,
        "FunctionExpression": enterFunction,

        "FunctionDeclaration:exit": exitFunction,
        "FunctionExpression:exit": exitFunction,

        "ReturnStatement": function (node) {
            var fn = functions[functions.length - 1];

            if (fn.isModuleDef) {
                context.report(node, MESSAGE);
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
