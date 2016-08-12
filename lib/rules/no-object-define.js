/**
 * @fileoverview Disallow use of Simple Name/Value Pairs form of `define`
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
        var MESSAGE = "Simple Name/Value Pairs form of `define` is not allowed";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isObjectDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
