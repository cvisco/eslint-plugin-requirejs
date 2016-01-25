/**
 * @fileoverview Ensure AMD-style callbacks contain correct number of arguments
 * @author Kevin Partington
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

    var allowExtraDependencies = (context.options && context.options[0] && context.options[0].allowExtraDependencies) || false;
    var TOO_MANY_PARAMS_MESSAGE = "Too many parameters in {{functionName}} callback (expected {{expected}}, found {{actual}}).";
    var TOO_FEW_PARAMS_MESSAGE = "Not enough parameters in {{functionName}} callback (expected {{expected}}, found {{actual}}).";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isFunctionExpression(node) {
        return node.type === "FunctionExpression";
    }

    function requireHasCallback(node) {
        return node.arguments.filter(isFunctionExpression).length;
    }

    function checkArity(node, funcName) {
        var dependencyNodes = util.getDependencyNodes(node),
            dependencyCount,
            callbackParams,
            actualParamCount;

        if (!dependencyNodes) {
            return;
        }

        dependencyCount = dependencyNodes.length;
        callbackParams = util.getAmdCallback(node).params;
        actualParamCount = callbackParams.length;

        if (dependencyNodes.length < callbackParams.length) {
            context.report(node, TOO_MANY_PARAMS_MESSAGE, {
                functionName: funcName,
                expected: dependencyCount,
                actual: actualParamCount
            });
        } else if (dependencyNodes.length > callbackParams.length && !allowExtraDependencies) {
            context.report(node, TOO_FEW_PARAMS_MESSAGE, {
                functionName: funcName,
                expected: dependencyCount,
                actual: actualParamCount
            });
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            /* istanbul ignore else: correctly does nothing */
            if (util.isDefineCall(node) && util.isAmdDefine(node)) {
                checkArity(node, "define");
            } else if (util.isRequireCall(node) && requireHasCallback(node)) {
                checkArity(node, node.callee.name);
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
            "allowExtraDependencies": {
                "type": "boolean",
                "default": false
            }
        },
        "additionalProperties": false
    }
];
