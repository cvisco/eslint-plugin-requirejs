/**
 * @fileoverview Disallow use of named module form of `define`
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
        const MESSAGE = "Named module form of `define` is not allowed";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isNamedDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
