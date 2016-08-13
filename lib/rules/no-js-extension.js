/**
 * @fileoverview Disallow `.js` extension in dependency paths
 * @author Casey Visco
 */

"use strict";

const util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: [
            {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            }
        ]
    },

    create: function (context) {
        const MESSAGE = "Don't use .js extension in dependency path.";
        const ALL_PLUGINS_PREFIX_REGEX = /^(\w+)\!/i;

        const pluginsToCheck = context.options[0] || [];
        const listedPluginsPrefixRegex = new RegExp("^(" + pluginsToCheck.join("|") + ")\!", "i");

        /**
         * Determines if provided `node` should be checked for .js extension or not.
         *
         * @private
         * @param {ASTNode} node - Literal node to test
         * @returns {Boolean} true if literal node should be checked for .js extension
         */
        function shouldBeChecked(node) {
            const path = node.value.trim();
            let result = true;

            if (!path.match(listedPluginsPrefixRegex) && path.match(ALL_PLUGINS_PREFIX_REGEX)) {
                result = false;
            }

            return result;
        }

        /**
         * Determine if provided `node` contains a path with a .js extension.
         *
         * @private
         * @param  {ASTNode} node - Literal node to test
         * @returns {Boolean} true if literal value ends in ".js"
         */
        function hasJsExtension(node) {
            const path = node.value.trim();
            const startAt = path.length - 3;

            return path.indexOf(".js", startAt) !== -1;
        }

        return {
            "CallExpression": function (node) {
                if (util.isDefineCall(node) || util.isRequireCall(node)) {
                    util.getDependencyStringNodes(node).forEach(function (pathNode) {
                        if (shouldBeChecked(pathNode) && hasJsExtension(pathNode)) {
                            context.report(pathNode, MESSAGE);
                        }
                    });
                }
            }
        };
    }
};
