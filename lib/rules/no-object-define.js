/**
 * @fileoverview Disallow use of Simple Name/Value Pairs form of `define`
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

            if (helpers.isObjectDef(args)) {
                context.report(node, "Simple Name/Value Pairs form of `define` is not allowed");
            }
        }
    };

};

