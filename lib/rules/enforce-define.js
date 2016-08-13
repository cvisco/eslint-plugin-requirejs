/**
 * @fileoverview Disallow files that are not wrapped in a call to `define`
 * @author Casey Visco
 */

"use strict";

const path = require("path");
const util = require("../util");
const ast = require("../utils/ast");

module.exports = {
    meta: {
        docs: {},
        schema: [
            {
                "anyOf": [
                    {
                        "type": "string"
                    },
                    {
                        "type": "array",
                        "uniqueItems": true,
                        "items": {
                            "type": "string"
                        }
                    }
                ]
            }
        ]
    },

    create: function (context) {
        const MESSAGE = "File must be wrapped in a `define` call";
        const ignoredFiles = context.options[0] || [];

        /**
         * Determine if supplied `filename` is allowed to not be wrapped in a
         * `define` call.
         * @private
         * @param {String}  filename - filename to test
         * @returns {Boolean} true if filename is allowed
         */
        function isIgnoredFile(filename) {
            const basename = path.basename(filename);
            return ignoredFiles.indexOf(basename) !== -1;
        }

        return {
            "Program": function (node) {
                const filename = context.getFilename();

                if (isIgnoredFile(filename)) {
                    return;
                }

                for (let i = 0, length = node.body.length; i < length; i += 1) {
                    const child = node.body[i];

                    if (!(ast.isExprStatement(child) && util.isDefineCall(child.expression))) {
                        context.report(node, MESSAGE);
                        break;
                    }
                }
            }
        };
    }
};
