/**
 * @fileoverview Predicates for testing define signatures
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var COMMON_JS_PARAMS = [ "require", "exports", "module" ];

/**
 * Determine if supplied `node` has no parameter list.
 *
 * @private
 * @param  {ASTNode} node - FunctionExpression node to test
 * @return {Boolean} true if has no parameter list
 */
function hasNoParams(node) {
    return node.params.length === 0;
}

/**
 * Determine if supplied `node` has a parameter list that meets the requirements
 * for a Simplified CommonJS Wrapper.
 *
 * @private
 * @param  {ASTNode} node - FunctionExpression node to test
 * @return {Boolean} true if has a CommonJS Wrapper parameter list
 */
function hasCommonJsParams(node) {
    return node.params.length && node.params.every(function (param, index) {
        return param.name === COMMON_JS_PARAMS[index];
    });
}

/**
 * Determine if supplied `node` represents a literal of any kind.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a literal
 */
function isLiteral(node) {
    return node && node.type === "Literal";
}

/**
 * Determine if supplied `node` represents a string literal.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a string literal
 */
function isStringLiteral(node) {
    return node && node.type === "Literal" && typeof node.value === "string";
}

/**
 * Determine if supplied `node` represents an array of string literals. Empty
 * arrays are also valid here.
 *
 * @private
 * @param  {ASTNode} node - ArrayExpression node to test
 * @return {Boolean} true if represents an array of string literals
 */
function isStringLiteralArray(node) {
    return node.elements.length === 0 || node.elements.every(isStringLiteral);
}

/**
 * Determine if supplied `node` represents an array expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents an array expression
 */
function isArrayExpr(node) {
    return node && node.type === "ArrayExpression";
}

/**
 * Determine if supplied `node` represents an object expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents an object expression
 */
function isObjectExpr(node) {
    return node && node.type === "ObjectExpression";
}

/**
 * Determine if supplied `node` represents a function expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a function expression
 */
function isFunctionExpr(node) {
    return node && node.type === "FunctionExpression";
}

/**
 * Determine if supplied `node` represents a "simple" function expression. That
 * is, one without any parameter list.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a simple function expression
 */
function isSimpleFuncExpr(node) {
    return isFunctionExpr(node) && hasNoParams(node);
}

/**
 * Determine if supplied `node` represents a function expression compatible with
 * the Simplfied CommonJS Wrapper.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a CommonJS function expression
 */
function isCommonJsFuncExpr(node) {
    return isFunctionExpr(node) && hasCommonJsParams(node);
}

/**
 * Determine if supplied `node` represents a call to `define`.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a call to `define`
 */
function isDefineCall(node) {
    return node &&
           node.type === "CallExpression" &&
           node.callee.type === "Identifier" &&
           node.callee.name === "define";
}

/**
 * Determine if supplied `node` represents a module definition function with
 * a dependency array. This is the classic AMD style module definition.
 *
 * @see http://requirejs.org/docs/api.html#defdep
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents an AMD style module definition
 */
function isAmdDefine(node) {
    var args = node.arguments || [];

    return args.length === 2 && isArrayExpr(args[0]) && isFunctionExpr(args[1]) ||
           args.length === 3 && isStringLiteral(args[0]) && isArrayExpr(args[1]) && isFunctionExpr(args[2]);
}

/**
 * Determine if supplied `node` represents a plain object module. This is
 * referred to as the "Simple Name/Value Pairs" form of module in the
 * RequireJS documentation.
 *
 * @see http://requirejs.org/docs/api.html#defsimple
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents an Object Module Definition
 */
function isObjectDefine(node) {
    var args = node.arguments || [];

    return args.length === 1 && isObjectExpr(args[0]) ||
           args.length === 2 && isStringLiteral(args[0]) && isObjectExpr(args[1]);
}

/**
 * Determine if supplied `node` represents a module definition function with
 * no dependency array.
 *
 * @see http://requirejs.org/docs/api.html#deffunc
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a Simple Function Definition
 */
function isFunctionDefine(node) {
    var args = node.arguments || [];

    return args.length === 1 && isSimpleFuncExpr(args[0]) ||
           args.length === 2 && isStringLiteral(args[0]) && isSimpleFuncExpr(args[1]);
}

/**
 * Determine if supplied `node` represents a module definition using the
 * "Simplified CommonJS Wrapper" form.
 *
 * @see http://requirejs.org/docs/api.html#cjsmodule
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a Simplified CommonJS Wrapper
 */
function isCommonJsWrapper(node) {
    var args = node.arguments || [];

    return args.length === 1 && isCommonJsFuncExpr(args[0]) ||
           args.length === 2 && isStringLiteral(args[0]) && isCommonJsFuncExpr(args[1]);
}

/**
 * Determine if supplied `node` represents a named (or aliased) module
 * definition function.
 *
 * @see http://requirejs.org/docs/api.html#modulename
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a named module definition function
 */
function isNamedDefine(node) {
    var args = node.arguments || [];

    if (args.length < 2 || args.length > 3) {
        return false;
    }

    return isStringLiteral(args[0]);
}

/**
 * Determine if current function on the provided `stack` is a module
 * definition function.
 *
 * @private
 * @param  {Array} stack - function stack to inspect
 * @return {Boolean} true if current function is a module definition
 */
function isInsideModuleDef(stack) {
    return stack.length > 0 && stack[stack.length - 1];
}

/**
 * Determine if supplied `node` represents a valid `define` format.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a valid module definition function
 */
function isValidDefine(node) {
    var args = node.arguments;

    // If the wrong number of arguments is present, we know it's invalid,
    // so just return immediately
    if (args.length < 1 || args.length > 3) {
        return false;
    }

    // Named modules start with a string literal, if present, we can remove
    // it to continue testing the rest of the arguments
    if (isStringLiteral(args[0])) {
        args = args.slice(1);
    }

    return args.length === 1 && (isObjectExpr(args[0]) || isFunctionExpr(args[0])) ||
           args.length === 2 && isArrayExpr(args[0]) && isFunctionExpr(args[1]);
}

/**
 * Determine if supplied `node` represents a `require` or `requirejs`
 * identifier. Both are synonymous commands.
 *
 * @public
 * @param  {ASTNode} node - Identifier node to test
 * @return {Boolean} true if represents a require identifier.
 */
function isRequireIdentifier(node) {
    return node.name === "require" || node.name === "requirejs";
}

/**
 * Determine if supplied `node` represents a call to `require`.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a call to `require`
 */
function isRequireCall(node) {
    return node.type === "CallExpression" &&
           node.callee.type === "Identifier" &&
           isRequireIdentifier(node.callee);
}

/**
 * Determine if supplied `node` represents a `require` call with statically
 * defined dependencies. That is, only string literals.
 *
 * The single-argument form of `require` is used inside Simplified CommonJS
 * Wrapper definitions. The multiple-argument form of `require` can be used
 * anywhere, and will contain at least a dependency array and a callback
 * function, but may also contain an additional "errback" function as well.
 * Here, we only need to check the first argument to determine if the dependency
 * list is static.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents static `require` call
 */
function isStaticRequire(node) {
    var args = node.arguments;

    return isStringLiteral(args[0]) || isArrayExpr(args[0]) && isStringLiteralArray(args[0]);
}

/**
 * Determine if supplied `node` represents a valid `require` format.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents a valid `require` call
 */
function isValidRequire(node) {
    var args = node.arguments;

    // If the wrong number of arguments is present, we know it's invalid,
    // so just return immediately
    if (args.length < 1 || args.length > 3) {
        return false;
    }

    // Single argument form should be a string literal, an array expression,
    // or something that evalutes to one of those. Realistically, we can only
    // test for a few obviously incorrect cases
    if (args.length === 1) {
        return !isObjectExpr(args[0]) &&
               !isFunctionExpr(args[0]);
    }

    // For 2 or 3-argument forms, the tail arguments should be function
    // expressions, or something that could evaluate to a function expression.
    // Realistically, we can only test for a few obviously incorrect cases.
    if (args.length > 1 && (isObjectExpr(args[1]) || isArrayExpr(args[1]) || isLiteral(args[1]))) {
        return false;
    }

    if (args.length > 2 && (isObjectExpr(args[2]) || isArrayExpr(args[2]) || isLiteral(args[2]))) {
        return false;
    }

    // For 2 or 3-argument forms, the first argument should be an array
    // expression or something that evaluates to one. Again, realistically, we
    // can only test for a few obviously incorrect cases
    return !isLiteral(args[0]) &&
           !isObjectExpr(args[0]) &&
           !isFunctionExpr(args[0]);
}

/**
 * Determine if supplied `node` represents a require function with
 * a dependency array.
 *
 * @public
 * @param  {ASTNode} node - CallExpression node to test
 * @return {Boolean} true if represents an AMD style require function
 */
function isAmdRequire(node) {
    var args = node.arguments || [];

    return args.length === 2 && isArrayExpr(args[0]) && isFunctionExpr(args[1]);
}

/**
 * Retrieve the dependency list from the provided `node`, without any filtering
 * by dependency node type.
 *
 * @public
 * @param  {ASTNode} node CallExpression to inspect
 * @return {Array} list of dependency path nodes
 */
function getDependencyNodes(node) {
    var args = node.arguments,
        nodes;

    if (isDefineCall(node) && args.length > 1) {
        if (isArrayExpr(args[0])) {
            nodes = args[0].elements;
        } else if (isArrayExpr(args[1])) {
            nodes = args[1].elements;
        }
    } else if (isRequireCall(node)) {
        if (isArrayExpr(args[0])) {
            nodes = args[0].elements;
        } else if (isStringLiteral(args[0])) {
            nodes = [ args[0] ];
        }
    }

    return nodes;
}

/**
 * Retrieve the dependency list from the provided `node`, filtering by node
 * type to return only string literal dependencies.
 *
 * @public
 * @param  {ASTNode} node - CallExpression to inspect
 * @return {Array}   list of dependency path literals
 */
function getDependencyStringNodes(node) {
    var nodes = getDependencyNodes(node) || [];
    return nodes.filter(isStringLiteral);
}

/**
 * Retrieve the AMD callback function argument from the provided `node`.
 *
 * @private
 * @param {ASTNode} node - node to check for a function expression argument
 * @returns {ASTNode} callback function expression
 */
function getAmdCallback(node) {
    return node.arguments.filter(isFunctionExpr)[0];
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    // `define` related predicates
    isDefineCall: isDefineCall,
    isAmdDefine: isAmdDefine,
    isObjectDefine: isObjectDefine,
    isFunctionDefine: isFunctionDefine,
    isCommonJsWrapper: isCommonJsWrapper,
    isNamedDefine: isNamedDefine,
    isInsideModuleDef: isInsideModuleDef,
    isValidDefine: isValidDefine,

    // `require` related predicates
    isRequireIdentifier: isRequireIdentifier,
    isRequireCall: isRequireCall,
    isStaticRequire: isStaticRequire,
    isValidRequire: isValidRequire,
    isAmdRequire: isAmdRequire,

    // general utilities
    getDependencyNodes: getDependencyNodes,
    getDependencyStringNodes: getDependencyStringNodes,
    getAmdCallback: getAmdCallback
};
