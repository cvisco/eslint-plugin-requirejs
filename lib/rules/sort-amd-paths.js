/**
 * @fileoverview Ensure that required paths are ordered alphabetically
 * @author Ondřej Brejla <ondrej@brejla.cz>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require("path");
var util = require("../util");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Required paths are not in alphabetical order (expected '{{expected}}').";
    var ALL_PLUGINS_PREFIX_REGEX = /^(\w+\!)?(.*)/i;
    var options = context.options[0] || {};
    var settings = {
        compare: "compare" in options ? options.compare : "dirname-basename",
        sortPlugins: "sortPlugins" in options ? options.sortPlugins : "preserve",
        ignoreCase: "ignoreCase" in options ? options.ignoreCase : true
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if `firstArray` equals `secondArray`. Otherwise prints warning.
     *
     * @private
     * @param {Array} firstArray - first array for comparison
     * @param {Array} secondArray - second array for comparison
     */
    function checkArrayEquality(firstArray, secondArray) {
        for (var i = 0; i < firstArray.length; i++) {
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
     * @param  {ASTNode} node - node to test
     */
    function checkAlphabeticalOrder(node) {
        var dependencyStringNodes = util.getDependencyStringNodes(node),
            dependencyStringNodesToCheck = dependencyStringNodes,
            callbackParams = util.getAmdCallback(node).params;
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
        var result = 0,
            firstPath = firstStringNode.value,
            secondPath = secondStringNode.value;
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
        var result = 0;
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
        var result = 0,
            firstDirname = path.dirname(firstPath),
            firstBasename = path.basename(firstPath),
            secondDirname = path.dirname(secondPath),
            secondBasename = path.basename(secondPath);
        result = doComparison(firstDirname, secondDirname);
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
        var result = doPluginComparison(firstString, secondString);
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
        var result = doPluginComparison(firstString, secondString);
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
        var result = 0;
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
        var result = 0,
            firstStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(firstString)[1],
            secondStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(secondString)[1];
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
        var result = 0,
            firstStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(firstString)[1],
            secondStringPlugin = ALL_PLUGINS_PREFIX_REGEX.exec(secondString)[1];
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
        var result = 0,
            firstStringLength = firstString.length,
            secondStringLength = secondString.length,
            maxIteration = Math.min(firstStringLength, secondStringLength),
            firstStringChar,
            secondStringChar;
        for (var i = 0; i < maxIteration; i++) {
            firstStringChar = firstString[i];
            secondStringChar = secondString[i];
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
        var result = 0;
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
        var result = 0;
        if (firstStringLength < secondStringLength) {
            result = -1;
        } else if (firstStringLength > secondStringLength) {
            result = 1;
        }
        return result;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if ((util.isDefineCall(node) && util.isAmdDefine(node))
                    || (util.isRequireCall(node) && util.isAmdRequire(node))) {
                checkAlphabeticalOrder(node);
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [
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
];
