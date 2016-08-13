/**
 * @fileoverview Disallow use of dynamically generated paths in a `require` call
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
        const MESSAGE = "Dynamic `require` calls are not allowed.";

        return {
            "CallExpression": function (node) {
                if (util.isRequireCall(node) && !util.isStaticRequire(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
