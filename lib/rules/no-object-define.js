/**
 * @fileoverview Disallow use of Simple Name/Value Pairs form of `define`
 * @author Casey Visco
 */

"use strict";

const util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Simple Name/Value Pairs form of `define` is not allowed";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isObjectDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
