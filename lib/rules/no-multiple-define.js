/**
 * @fileoverview Disallow multiple `define` calls in a single file
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
        const MESSAGE = "Multiple `define` calls in a single file are not permitted";
        let defineCalls = 0;

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
