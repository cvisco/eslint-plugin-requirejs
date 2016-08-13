/**
 * @fileoverview Ensure that required paths are ordered alphabetically
 * @author Ondřej Brejla <ondrej@brejla.cz>
 */

"use strict";

const path = require("path");
const util = require("../util");

module.exports = {
    meta: {
        docs: {},
        schema: [
            {
                "type": "object",
                "properties": {
                    "compare": {
                        "enum": ["dirname-basename", "fullpath", "basename"]
                    },
                    "sortPlugins": {
                        "enum": ["preserve", "first", "last", "ignore"]
                    },
                    "ignoreCase": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            }
        ]
    },

    create: function (context) {
        const MESSAGE = "Required paths are not in alphabetical order (expected '{{expected}}').";
        const ALL_PLUGINS_PREFIX_REGEX = /^(\w+\!)?(.*)/i;
        const options = context.options[0] || {};
        const settings = {
            compare: "compare" in options ? options.compare : "dirname-basename",
            sortPlugins: "sortPlugins" in options ? options.sortPlugins : "preserve",
            ignoreCase: "ignoreCase" in options ? options.ignoreCase : true
        };

        /**
         * Determine if `firstArray` equals `secondArray`. Otherwise prints warning.
         *
         * @private
         * @param {Array} firstArray - first array for comparison
         * @param {Array} secondArray - second array for comparison
         * @returns {void}
         */
        function checkArrayEquality(firstArray, secondArray) {
            for (let i = 0; i < firstArray.length; i++) {
                if (firstArray[i] !== secondArray[i]) {
                    context.report(firstArray[i], MESSAGE, {
                        expected: secondArray[i].value
                    });
                    break;
                }
            }
        }

        /**
         * Determine if dependency string nodes of supplied `node` are in
         * alphabetical order
         *
         * @private
         * @param {ASTNode} node - node to test
         * @returns {void}
         */
        function checkAlphabeticalOrder(node) {
            const callbackParams = util.getAmdCallback(node).params;
            const dependencyStringNodes = util.getDependencyStringNodes(node);
            let dependencyStringNodesToCheck = dependencyStringNodes;

            if (dependencyStringNodes.length > callbackParams.length) {
                dependencyStringNodesToCheck = dependencyStringNodes.slice(0, callbackParams.length);
            }

            if (dependencyStringNodesToCheck) {
                checkArrayEquality(dependencyStringNodesToCheck, dependencyStringNodesToCheck.slice().sort(sortAlphabetically));
            }
        }

        /**
         * Sorting function for alphabetical sort of passed string nodes.
         *
         * @private
         * @param {ASTNode} firstStringNode - first string node to sort
         * @param {ASTNode} secondStringNode - second string node to sort
         * @returns {Number} 0 when nodes are equal, 1 when `firstStringNode`
         *                   should be placed after the `secondStringNode` and -1
         *                   when `firstStringNode` should be before the
         *                   `secondStringNode`
         */
        function sortAlphabetically(firstStringNode, secondStringNode) {
            let result = 0;
            let firstPath = firstStringNode.value;
            let secondPath = secondStringNode.value;

            if (settings.ignoreCase) {
                firstPath = firstPath.toLowerCase();
                secondPath = secondPath.toLowerCase();
            }

            if (settings.compare === "basename") {
                result = doBasenameComparison(firstPath, secondPath);
            } else {
                result = sortPaths(firstPath, secondPath);
            }

            return result;
        }

        /**
         * Sorting functin used when "dirname-basename" or "fullpath" option is set.
         *
         * @private
         * @param {String} firstPath - first path to sort
         * @param {String} secondPath - second path to sort
         * @returns {Number} 0 when paths are equal,
         *                   1 when `firstPath` should be placed after the
         *                     `secondPath` and
         *                  -1 when `firstPath` should be before the `secondPath`
         */
        function sortPaths(firstPath, secondPath) {
            let result = 0;

            if (settings.sortPlugins === "ignore") {
                firstPath = ALL_PLUGINS_PREFIX_REGEX.exec(firstPath)[2];
                secondPath = ALL_PLUGINS_PREFIX_REGEX.exec(secondPath)[2];
            }

            if (settings.compare === "dirname-basename") {
                result = checkDirnameBasename(firstPath, secondPath);
            } else {
                // fullpath
                result = doComparison(firstPath, secondPath);
            }

            return result;
        }

        /**
         * Sorting function used when "dirname-basename" option is set.
         *
         * @private
         * @param {String} firstPath - first path to sort
         * @param {String} secondPath - second path to sort
         * @returns {Number} 0 when paths are equal, 1 when `firstPath` should
         *                   be placed after the `secondPath` and -1 when
         *                   `firstPath` should be before the `secondPath`
         */
        function checkDirnameBasename(firstPath, secondPath) {
            const firstDirname = path.dirname(firstPath);
            const firstBasename = path.basename(firstPath);
            const secondDirname = path.dirname(secondPath);
            const secondBasename = path.basename(secondPath);

            let result = doComparison(firstDirname, secondDirname);

            if (result === 0) {
                result = doComparison(firstBasename, secondBasename);
            }

            return result;
        }

        /**
         * Pure alphabetical sorting which takes basenames into account.
         *
         * @private
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when strings are equal,
         *                   1 when `firstString` should be placed after the
         *                     `secondString` and
         *                  -1 when `firstString` should be before the `secondString`
         */
        function doBasenameComparison(firstString, secondString) {
            let result = doPluginComparison(firstString, secondString);

            if (result === 0) {
                result = doCharacterComparison(path.basename(firstString), path.basename(secondString));
            }

            return result;
        }

        /**
         * Pure alphabetical sorting function.
         *
         * @private
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when strings are equal, 1 when `firstString` should
         *                   be placed after the `secondString` and -1 when
         *                   `firstString` should be before the `secondString`
         */
        function doComparison(firstString, secondString) {
            let result = doPluginComparison(firstString, secondString);

            if (result === 0) {
                result = doCharacterComparison(firstString, secondString);
            }

            return result;
        }

        /**
         * Sorts path strings according to `sortPlugin` option.
         *
         * @private
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when strings are equal,
         *                   1 when `firstString` should be placed after the
         *                     `secondString` and
         *                  -1 when `firstString` should be before the `secondString`
         */
        function doPluginComparison(firstString, secondString) {
            let result = 0;

            if (settings.sortPlugins === "first") {
                result = doPluginFirstComparison(firstString, secondString);
            } else if (settings.sortPlugins === "last") {
                result = doPluginLastComparison(firstString, secondString);
            }

            return result;
        }

        /**
         * Sorts path strings which start with plugin prefix before path strings
         * which do not.
         *
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when both strings have no plugin prefix, or when both
         *                     strings have plugin prefix,
         *                   1 when `firstString` does not have and `secondString`
         *                     has plugin prefix
         *                  -1 when `firstString` has and `secondString` does not
         *                     have plugin prefix
         */
        function doPluginFirstComparison(firstString, secondString) {
            const firstStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(firstString)[1];
            const secondStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(secondString)[1];
            let result = 0;

            if (firstStringPlugin && !secondStringPlugin) {
                result = -1;
            } else if (!firstStringPlugin && secondStringPlugin) {
                result = 1;
            }

            return result;
        }

        /**
         * Sorts path strings which start with plugin prefix after path strings
         * which do not.
         *
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when both strings have no plugin prefix, or when both
         *                     strings have plugin prefix,
         *                   1 when `firstString` has and `secondString` does not
         *                     have plugin prefix
         *                  -1 when `firstString` does not have and `secondString`
         *                     has plugin prefix
         */
        function doPluginLastComparison(firstString, secondString) {
            const firstStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(firstString)[1];
            const secondStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(secondString)[1];
            let result = 0;

            if (firstStringPlugin && !secondStringPlugin) {
                result = 1;
            } else if (!firstStringPlugin && secondStringPlugin) {
                result = -1;
            }

            return result;
        }

        /**
         * Sorts alphabetically by char-by-char comparison.
         *
         * @param {String} firstString - first string to alphabetical sort
         * @param {String} secondString - second string to alphabetical sort
         * @returns {Number} 0 when strings are equal,
         *                   1 when `firstString` should be placed after the
         *                     `secondString` and
         *                  -1 when `firstString` should be before the `secondString`
         */
        function doCharacterComparison(firstString, secondString) {
            const firstStringLength = firstString.length;
            const secondStringLength = secondString.length;
            const maxIteration = Math.min(firstStringLength, secondStringLength);
            let result = 0;

            for (let i = 0; i < maxIteration; i++) {
                const firstStringChar = firstString[i];
                const secondStringChar = secondString[i];
                result = compareCharacters(firstStringChar, secondStringChar);

                if (result !== 0) {
                    break;
                }
            }

            if (result === 0) {
                result = compareStringLength(firstStringLength, secondStringLength);
            }

            return result;
        }

        /**
         * Compares two characters. It preferes to have "slash" before any other
         * character.
         *
         * @param {String} firstChar - first character to compare
         * @param {String} secondChar - second character to compare
         * @returns {Number} 0 when `firstChar` equals `secondChar`,
         *                   1 when `firstChar` is smaller then `secondChar` while
         *                     `secondChar` is "slash", or `firstChar` is greater
         *                     then `secondChar` while `firstChar` is not a "slash",
         *                   -1 when `firstChar` is greater then `secondChar` while
         *                     `firstChar` is "slash", or `firstChar` is smaller
         *                     then `secondChar` while `secondChar` is not "slash"
         */
        function compareCharacters(firstChar, secondChar) {
            let result = 0;

            if (firstChar < secondChar) {
                if (secondChar === "/") {
                    result = 1;
                } else {
                    result = -1;
                }
            } else if (firstChar > secondChar) {
                if (firstChar === "/") {
                    result = -1;
                } else {
                    result = 1;
                }
            }

            return result;
        }

        /**
         * Compares two string lengths.
         *
         * @param {Number} firstStringLength - length of the first compared string
         * @param {Number} secondStringLength - length of the second compared string
         * @returns {Number} 0 when string lengths are equal, 1 when
         *                   `firstStringLength` is greater then `secondStringLength`
         *                   and -1 when `firstStringLength` is smaller then
         *                   `secondStringLength`
         */
        function compareStringLength(firstStringLength, secondStringLength) {
            let result = 0;

            if (firstStringLength < secondStringLength) {
                result = -1;
            } else if (firstStringLength > secondStringLength) {
                result = 1;
            }

            return result;
        }

        return {
            "CallExpression": function (node) {
                if ((util.isDefineCall(node) && util.isAmdDefine(node))
                        || (util.isRequireCall(node) && util.isAmdRequire(node))) {
                    checkAlphabeticalOrder(node);
                }
            }
        };
    }
};
