/**
 * @fileoverview Disallow multiple `define` calls in a single file
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Multiple `define` calls in a single file are not permitted";

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Program": function (node) {
            var defineCount = 0,
                token,
                length,
                i;

            for (i = 0, length = node.tokens.length; i < length; i += 1) {
                token = node.tokens[i];

                if (token.type === "Identifier" && token.value === "define") {
                    defineCount += 1;
                }
            }

            if (defineCount > 1) {
                context.report(node, MESSAGE);
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
