/**
 * @fileoverview Disallow files that are not wrapped in a call to `define`
 * @author Casey Visco
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

    var MESSAGE = "File must be wrapped in a `define` call";
    var ignoredFiles = context.options[0] || [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if supplied `node` represents an expression of any kind.
     *
     * @private
     * @param  {ASTNode} node - node to test
     * @return {Boolean} true if represents an expression statement
     */
    function isExpressionStatement(node) {
        return node.type === "ExpressionStatement";
    }

    /**
     * Determine if supplied `filename` is allowed to not be wrapped in a
     * `define` call.
     *
     * @param  {String}  filename - filename to test
     * @return {Boolean} true if filename is allowed
     */
    function isIgnoredFile(filename) {
        var basename = path.basename(filename);
        return ignoredFiles.indexOf(basename) !== -1;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Program": function (node) {
            var filename = context.getFilename(),
                child, length, i;

            if (isIgnoredFile(filename)) {
                return;
            }

            for (i = 0, length = node.body.length; i < length; i += 1) {
                child = node.body[i];

                if (!(isExpressionStatement(child) && util.isDefineCall(child.expression))) {
                    context.report(node, MESSAGE);
                    break;
                }
            }
        }
    };

};


//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [
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
];
