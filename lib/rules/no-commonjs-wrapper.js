/**
 * @fileoverview Disallow use of Simplified CommonJS Wrapper form of `define`
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
        const MESSAGE = "Simplified CommonJS Wrapper form of `define` is not allowed";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && util.isCommonJsWrapper(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
