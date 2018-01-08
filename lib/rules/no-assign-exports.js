/**
 * @file    Rule to disallow assignment to `exports` when using Simplified
 *          CommonJS Wrapper
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const ast = require("../utils/ast");
const rjs = require("../utils/rjs");

const ancestor = ast.ancestor;
const isCommonJsWrapper = rjs.isCommonJsWrapper;

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const docs = {
    description: "Disallow assignment to `exports` when using Simplified CommonJS Wrapper",
    category: "Possible Errors",
    recommended: true,
    url: "https://github.com/cvisco/eslint-plugin-requirejs/blob/master/docs/rules/no-assign-exports.md"
};

const schema = [];

const message = "Invalid assignment to `exports`.";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const assignsToExports = (node) =>
    node.left.type === "Identifier" &&
    node.left.name === "exports";

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

function create(context) {
    return {
        AssignmentExpression(node) {
            if (assignsToExports(node) && ancestor(isCommonJsWrapper, node)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
