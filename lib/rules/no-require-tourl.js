/**
 * @fileoverview Disallow use of `require.toUrl` and `require.nameToUrl`
 * @author Casey Visco
 */

"use strict";

const util = require("../util");
const ast = require("../utils/ast");

module.exports = {
    meta: {
        docs: {},
        schema: []
    },

    create: function (context) {
        const TO_URL_MESSAGE = "Use of `require.toUrl` is not allowed.";
        const NAME_TO_URL_MESSAGE = "Use of `require.nameToUrl` is not allowed.";

        function isRequireMemberCall(node, methodName) {
            return ast.isMemberExpr(node) &&
                   ast.isIdentifier(node.object) &&
                   util.isRequireIdentifier(node.object) &&
                   ast.isIdentifier(node.property) &&
                   node.property.name === methodName;
        }

        return {
            "CallExpression": function (node) {
                if (isRequireMemberCall(node.callee, "toUrl")) {
                    context.report(node, TO_URL_MESSAGE);
                } else if (isRequireMemberCall(node.callee, "nameToUrl")) {
                    context.report(node, NAME_TO_URL_MESSAGE);
                }
            }
        };
    }
};
