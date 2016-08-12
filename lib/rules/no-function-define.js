/**
 * @fileoverview Disallow use of simple function form of `define`
 * @author Casey Visco
 */

"use strict";

var util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        var MESSAGE = "Simple function form of `define` is not allowed";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isFunctionDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
