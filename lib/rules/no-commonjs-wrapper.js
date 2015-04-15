/**
 * @fileoverview Disallow use of Simplified CommonJS Wrapper form of `define`
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

    var MESSAGE = "Simplified CommonJS Wrapper form of `define` is not allowed";


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    function isCommonJsFuncExpr(node) {
        return node.type === "FunctionExpression" &&
               helpers.hasCommonJsSignature(node.params);
    }

    function isCommonJsWrapper(node) {
        var args = node.arguments;

        return args.length === 1 && isCommonJsFuncExpr(args[0]) ||
               args.length === 2 && isStringLiteral(args[0]) && isCommonJsFuncExpr(args[1]);
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (node.callee.name !== "define") {
                return;
            }

            if (isCommonJsWrapper(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

