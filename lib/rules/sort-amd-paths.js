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
    var options = context.options[0] || {};
    var settings = {
        compare: "compare" in options ? options.compare : "dirname-basename",
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
        var result = 0;
        if (firstString < secondString) {
            result = -1;
        } else if (secondString < firstString) {
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
            "ignoreCase": {
                "type": "boolean"
            }
        },
        "additionalProperties": false

    }
];
