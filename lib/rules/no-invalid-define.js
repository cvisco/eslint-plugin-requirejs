/**
 * @fileoverview Disallow invalid or undesired forms of `define`
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
        var MESSAGE = "Invalid module definition";

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) && !util.isValidDefine(node)) {
                    context.report(node, MESSAGE);
                }
            }
        };
    }
};
