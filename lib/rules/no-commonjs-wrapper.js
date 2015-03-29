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

    return {
        "CallExpression": function (node) {
            var args = node.arguments;

            if (node.callee.name !== "define") {
                return;
            }

            if (helpers.isCommonJsDef(args)) {
                context.report(node, "Simplified CommonJS Wrapper form of `define` is not allowed");
            }
        }
    };

};

