/**
 * @file    Rule to disallow use of `return` statement in a module definition
 *          when using Simplified CommonJS Wrapper
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const ast = require("../utils/ast");
const rjs = require("../utils/rjs");

const nearest = ast.nearest;
const isCommonJsWrapper = rjs.isCommonJsWrapper;

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const docs = {
    description: "Disallow use of `return` statement in a module definition when",
    category: "Stylistic Choices",
    recommended: true,
    url: "https://github.com/cvisco/eslint-plugin-requirejs/blob/master/docs/rules/no-commonjs-return.md"
};

const schema = [];

const message = "Unexpected `return` in module definition.";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const isFunction = (node) =>
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression";

const nearestFunction = (node) => nearest(isFunction, node);

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

function create(context) {
    return {
        ReturnStatement(node) {
            if (isCommonJsWrapper(nearestFunction(node).parent)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
