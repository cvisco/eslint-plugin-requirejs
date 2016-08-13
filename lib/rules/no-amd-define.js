/**
 * @fileoverview Disallow use of AMD (dependency array) form of `define`
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
        const MESSAGE = "AMD form of `define` is not allowed.";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isAmdDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
