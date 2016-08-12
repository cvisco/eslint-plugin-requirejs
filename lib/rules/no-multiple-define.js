/**
 * @fileoverview Disallow multiple `define` calls in a single file
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
        var MESSAGE = "Multiple `define` calls in a single file are not permitted",
            defineCalls = 0;

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node)) {
                    ++defineCalls;

                    if (defineCalls > 1) {
                        context.report(node, MESSAGE);
                    }
                }
            }
        };
    }
};
