/**
 * @fileoverview Disallow assignment to `exports` when using Simplified CommonJS Wrapper
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

    var isCommonJS = false;

    //------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            isCommonJS = isCommonJS || helpers.isCommonJsDef(node.arguments);
        },

        "CallExpression:exit": function (node) {
            if (helpers.isCommonJsDef(node.arguments)) {
                isCommonJS = false;
            }
        },

        "AssignmentExpression": function (node) {
            var isIdentifier = node.left.type === "Identifier",
                isExports = node.left.name === "exports";

            if (isCommonJS && isIdentifier && isExports) {
                context.report(node, "Invalid assignment to `exports`.");
            }
        }
    };

};

