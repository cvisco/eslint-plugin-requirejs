/**
 * @fileoverview Disallow `.js` extension in dependency paths
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("../util");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Don't use .js extension in dependency path.";
    var ALL_PLUGINS_PREFIX_REGEX = /^(\w+)\!/i;

    var pluginsToCheck = context.options[0] || [];
    var listedPluginsPrefixRegex = new RegExp("^(" + pluginsToCheck.join("|") + ")\!", "i");

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines if provided `node` should be checked for .js extension or not.
     *
     * @private
     * @param {ASTNode} node - Literal node to test
     * @returns {Boolean} true if literal node should be checked for .js extension
     */
    function shouldBeChecked(node) {
        var result = true,
            path = node.value.trim();
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
     * @return {Boolean} true if literal value ends in ".js"
     */
    function hasJsExtension(node) {
        var path = node.value.trim(),
            startAt = path.length - 3;

        return path.indexOf(".js", startAt) !== -1;
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

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

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [
    {
        "type": "array",
        "uniqueItems": true,
        "items": {
            "type": "string"
        }
    }
];
