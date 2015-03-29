/**
 * @fileoverview Disallow use of AMD (dependency array) form of `define`
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

            if (helpers.isAmdDef(args)) {
                context.report(node, "AMD form of `define` is not allowed");
            }
        }
    };

};

