/**
 * @fileoverview Disallow use of simple function form of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Simple function form of `define` is not allowed";


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    function isSimpleFuncExpr(node) {
        return node.type === "FunctionExpression" &&
               node.params.length === 0;
    }

    function isFunctionDefine(node) {
        var args = node.arguments;

        return args.length === 1 && isSimpleFuncExpr(args[0]) ||
               args.length === 2 && isStringLiteral(args[0]) && isSimpleFuncExpr(args[1]);
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (node.callee.name !== "define") {
                return;
            }

            if (isFunctionDefine(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

