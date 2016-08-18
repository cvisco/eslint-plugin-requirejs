/**
 * @fileoverview Rule to disallow `.js` extension in dependency paths
 * @author Casey Visco
 */

"use strict";

const util = require("../util");

const isDefineCall = util.isDefineCall;
const isRequireCall = util.isRequireCall;
const getDependencyStringNodes = util.getDependencyStringNodes;

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const ERROR_MSG = "Don't use .js extension in dependency path.";

module.exports = {
    meta: {
        docs: {
            description: "Disallow `.js` extension in dependency paths",
            category: "Possible Errors",
            recommended: true
        },
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
        const pluginsToCheck = context.options[0] || [];
        const LISTED_PLUGINS = new RegExp("^(" + pluginsToCheck.join("|") + ")\!", "i");
        const ALL_PLUGINS = /^(\w+)\!/i;

        /**
         * Determines if provided `node` should be checked for .js extension or
         * not. Path's to check either do not have a plugin prefix OR have a
         * plugin prefix that's supplied as an option to the rule.
         * @private
         * @param {String} path - path to test
         * @returns {Boolean} true if path should be checked for .js extension
         */
        function shouldBeChecked(path) {
            return path.match(LISTED_PLUGINS) || !path.match(ALL_PLUGINS);
        }

        function check(node) {
            const path = node.value.trim();
            if (shouldBeChecked(path) && path.endsWith(".js")) {
                context.report(node, ERROR_MSG);
            }
        }

        return {
            "CallExpression": function (node) {
                if (isDefineCall(node) || isRequireCall(node)) {
                    getDependencyStringNodes(node).forEach(check);
                }
            }
        };
    }
};
