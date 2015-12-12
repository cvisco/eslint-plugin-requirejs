/**
 * @fileoverview Disallow multiple `define` calls in a single file
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Multiple `define` calls in a single file are not permitted",
        defineCalls = 0;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (util.isDefineCall(node)) {
                ++defineCalls;

                if (defineCalls > 1) {
                    context.report(node, MESSAGE);
                }
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
