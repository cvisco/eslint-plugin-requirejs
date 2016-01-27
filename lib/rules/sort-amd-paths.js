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

    var MESSAGE = "Required paths are not in alphabetical order.";
    var options = context.options[0] || {};
    var settings = {
        compare: "compare" in options ? options.compare : "dirname-basename",
        ignoreCase: "ignoreCase" in options ? options.ignoreCase : true
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if `firstArray` equals `secondArray`.
     *
     * @private
     * @param {Array} firstArray - first array for comparison
     * @param {Array} secondArray - second array for comparison
     * @returns {Boolean} true if `firstArray` is equal to `secondArray`
     */
    function isArrayEqualTo(firstArray, secondArray) {
        var result = true;
        for (var i = 0; i < firstArray.length; i++) {
            if (firstArray[i] !== secondArray[i]) {
                result = false;
                break;
            }
        }
        return result;
    }

    /**
     * Determine if dependency string nodes of supplied `node` are in
     * alphabetical order
     *
     * @private
     * @param  {ASTNode} node - node to test
     * @return {Boolean} true if dependency string nodes are in alphabetical
     *                   order
     */
    function isInAlphabeticalOrder(node) {
        var result = true,
            dependencyStringNodes = util.getDependencyStringNodes(node),
            dependencyStringNodesToCheck = dependencyStringNodes,
            callbackParams = util.getAmdCallback(node).params;
        if (dependencyStringNodes.length > callbackParams.length) {
            dependencyStringNodesToCheck = dependencyStringNodes.slice(0, callbackParams.length);
        }
        if (dependencyStringNodesToCheck) {
            result = isArrayEqualTo(dependencyStringNodesToCheck, dependencyStringNodesToCheck.slice().sort(sortAlphabetically));
        }
        return result;
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
        if (settings.compare === "dirname-basename") {
            result = checkDirnameBasename(firstPath, secondPath);
        } else if (settings.compare === "fullpath") {
            result = doComparison(firstPath, secondPath);
        } else {
            // basename
            result = doComparison(path.basename(firstPath), path.basename(secondPath));
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
            if (((util.isDefineCall(node) && util.isAmdDefine(node)) || (util.isRequireCall(node) && util.isAmdRequire(node)))
                    && !isInAlphabeticalOrder(node)) {
                context.report(node, MESSAGE);
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
            "ignoreCase": {
                "type": "boolean"
            }
        },
        "additionalProperties": false

    }
];
