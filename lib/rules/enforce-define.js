/**
 * @fileoverview Disallow files that are not wrapped in a call to `define`
 * @author Casey Visco
 */

"use strict";

const path = require("path");
const util = require("../util");

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
         * Determine if supplied `node` represents an expression of any kind.
         *
         * @private
         * @param  {ASTNode} node - node to test
         * @returns {Boolean} true if represents an expression statement
         */
        function isExpressionStatement(node) {
            return node.type === "ExpressionStatement";
        }

        /**
         * Determine if supplied `filename` is allowed to not be wrapped in a
         * `define` call.
         *
         * @param  {String}  filename - filename to test
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

                    if (!(isExpressionStatement(child) && util.isDefineCall(child.expression))) {
                        context.report(node, MESSAGE);
                        break;
                    }
                }
            }
        };
    }
};
