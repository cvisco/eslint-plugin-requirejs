/**
 * @fileoverview Disallow use of `require.toUrl` and `require.nameToUrl`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var TO_URL_MESSAGE = "Use of `require.toUrl` is not allowed.";
    var NAME_TO_URL_MESSAGE = "Use of `require.nameToUrl` is not allowed.";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------


    function isRequireMemberCall(node, methodName) {
        return node.type === "MemberExpression" &&
               node.object.type === "Identifier" &&
               node.object.name === "require" &&
               node.property.type === "Identifier" &&
               node.property.name === methodName;
    }

    //------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (isRequireMemberCall(node.callee, "toUrl")) {
                context.report(node, TO_URL_MESSAGE);
            } else if (isRequireMemberCall(node.callee, "nameToUrl")) {
                context.report(node, NAME_TO_URL_MESSAGE);
            }
        }
    };

};

