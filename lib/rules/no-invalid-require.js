/**
 * @fileoverview Disallow invalid or undesired forms of `require`
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
        var MESSAGE = "Invalid arguments provided to `require` call.";

        return {
            "CallExpression": function (node) {
                if (util.isRequireCall(node) && !util.isValidRequire(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
