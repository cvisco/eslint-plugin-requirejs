/**
 * @fileoverview Ensure AMD-style callbacks contain correct number of arguments
 * @author Kevin Partington
 */

"use strict";

const util = require("../util");
const ast = require("../utils/ast");

module.exports = {
    meta: {
        docs: {},
        schema: [
            {
                "type": "object",
                "properties": {
                    "allowExtraDependencies": {
                        anyOf: [
                            {
                                "type": "boolean",
                                "default": false
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
                },
                "additionalProperties": false
            }
        ]
    },

    create: function (context) {
        const allowExtraDependencies = (context.options && context.options[0] && context.options[0].allowExtraDependencies) || false;
        const TOO_MANY_PARAMS_MESSAGE = "Too many parameters in {{functionName}} callback (expected {{expected}}, found {{actual}}).";
        const TOO_FEW_PARAMS_MESSAGE = "Not enough parameters in {{functionName}} callback (expected {{expected}}, found {{actual}}).";

        function allUnassignedPathsAreAllowed(dependencyNodes, callbackParams) {
            if (typeof allowExtraDependencies === "boolean") {
                return allowExtraDependencies;
            }

            const unassignedPaths = dependencyNodes.slice(callbackParams.length);

            return unassignedPaths.every(function (path) {
                return allowExtraDependencies.indexOf(path.value) !== -1;
            });
        }

        function checkArity(node, funcName) {
            const dependencyNodes = util.getDependencyNodes(node);

            if (!dependencyNodes) {
                return;
            }

            const dependencyCount = dependencyNodes.length;
            const callbackParams = util.getAmdCallback(node).params;
            const actualParamCount = callbackParams.length;

            if (dependencyCount < actualParamCount) {
                context.report(node, TOO_MANY_PARAMS_MESSAGE, {
                    functionName: funcName,
                    expected: dependencyCount,
                    actual: actualParamCount
                });
            } else if (dependencyCount > actualParamCount && !allUnassignedPathsAreAllowed(dependencyNodes, callbackParams)) {
                context.report(node, TOO_FEW_PARAMS_MESSAGE, {
                    functionName: funcName,
                    expected: dependencyCount,
                    actual: actualParamCount
                });
            }
        }

        return {
            "CallExpression": function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (util.isDefineCall(node) && util.isAmdDefine(node)) {
                    checkArity(node, "define");
                } else if (util.isRequireCall(node) && ast.hasCallback(node)) {
                    checkArity(node, node.callee.name);
                }
            }
        };
    }
};
