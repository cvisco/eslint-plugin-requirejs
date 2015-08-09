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

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

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
                util.getDependencyNodes(node).forEach(function (pathNode) {
                    if (hasJsExtension(pathNode)) {
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

module.exports.schema = [];
