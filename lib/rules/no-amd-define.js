/**
 * @fileoverview Disallow use of AMD (dependency array) form of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "AMD form of `define` is not allowed.";


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    function isArrayExpr(node) {
        return node.type === "ArrayExpression";
    }

    function isFunctionExpr(node) {
        return node.type === "FunctionExpression";
    }

    function isAmdDefine(node) {
        var args = node.arguments;

        return args.length === 2 && isArrayExpr(args[0]) && isFunctionExpr(args[1]) ||
               args.length === 3 && isStringLiteral(args[0]) && isArrayExpr(args[1]) && isFunctionExpr(args[2]);
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (node.callee.name !== "define") {
                return;
            }

            if (isAmdDefine(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

