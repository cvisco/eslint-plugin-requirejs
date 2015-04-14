/**
 * @fileoverview Disallow use of Simple Name/Value Pairs form of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Simple Name/Value Pairs form of `define` is not allowed";


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    function isObjectExpr(node) {
        return node.type === "ObjectExpression";
    }

    function isObjectDefine(node) {
        var args = node.arguments;

        return args.length === 1 && isObjectExpr(args[0]) ||
               args.length === 2 && isStringLiteral(args[0]) && isObjectExpr(args[1]);
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (node.callee.name !== "define") {
                return;
            }

            if (isObjectDefine(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

