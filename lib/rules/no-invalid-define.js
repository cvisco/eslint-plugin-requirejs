/**
 * @fileoverview Disallow invalid or undesired forms of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var helpers = require("../helpers");
var util = require("../util");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Invalid module definition";

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (util.isDefineCall(node) && !helpers.isValidDef(node.arguments)) {
                context.report(node, MESSAGE);
            }
        }
    };

};

