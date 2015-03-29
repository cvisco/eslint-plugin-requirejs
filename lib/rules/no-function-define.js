/**
 * @fileoverview Disallow use of simple function form of `define`
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

            if (helpers.isFunctionDef(args)) {
                context.report(node, "Simple function form of `define` is not allowed");
            }
        }
    };

};

