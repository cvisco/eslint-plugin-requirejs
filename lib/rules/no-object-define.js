/**
 * @fileoverview Disallow use of Simple Name/Value Pairs form of `define`
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

    var MESSAGE = "Simple Name/Value Pairs form of `define` is not allowed";

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (util.isObjectDefine(node)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

