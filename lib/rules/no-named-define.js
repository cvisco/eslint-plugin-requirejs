/**
 * @fileoverview Disallow use of named module form of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Named module form of `define` is not allowed";


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }

    /**
     * Determine if supplied node represents a named module definition function.
     *
     * @see http://requirejs.org/docs/api.html#modulename
     *
     * @param  {ASTNode} node - CallExpression node to test
     * @return {Boolean} represents a named module definition function
     */
    function isNamedDefine(node) {
        var args = node.arguments;

        if (args.length < 2 || args.length > 3) {
            return false;
        }

        // First argument must be a string literal
        return isStringLiteral(args[0]);
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (node.callee.name !== "define") {
                return;
            }

            if (isNamedDefine(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

