/**
 * @fileoverview Disallow use of named module form of `define`
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

    return {
        "CallExpression": function (node) {
            var args = node.arguments;

            if (node.callee.name !== "define") {
                return;
            }

            if (helpers.isNamedDef(args)) {
                context.report(node, "Named module form of `define` is not allowed");
            }
        }
    };

};

