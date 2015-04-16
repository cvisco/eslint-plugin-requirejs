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
 * Determine if supplied `node` represents a string literal.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a string literal
 */
function isStringLiteral(node) {
    return node.type === "Literal" && typeof node.value === "string";
}

/**
 * Determine if supplied `node` represents an array expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents an array expression
 */
function isArrayExpr(node) {
    return node.type === "ArrayExpression";
}

/**
 * Determine if supplied `node` represents an object expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents an object expression
 */
function isObjectExpr(node) {
    return node.type === "ObjectExpression";
}

/**
 * Determine if supplied `node` represents a function expression.
 *
 * @private
 * @param  {ASTNode} node - node to test
 * @return {Boolean} true if represents a function expression
 */
function isFunctionExpr(node) {
    return node.type === "FunctionExpression";
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
    return node.type === "CallExpression" &&
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

    return isDefineCall(node) &&
           args.length === 2 && isArrayExpr(args[0]) && isFunctionExpr(args[1]) ||
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

    return isDefineCall(node) &&
           args.length === 1 && isObjectExpr(args[0]) ||
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

    return isDefineCall(node) &&
           args.length === 1 && isSimpleFuncExpr(args[0]) ||
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

    return isDefineCall(node) &&
           args.length === 1 && isCommonJsFuncExpr(args[0]) ||
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

    return isDefineCall(node) && isStringLiteral(args[0]);
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


//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    // Predicates
    isDefineCall: isDefineCall,
    isAmdDefine: isAmdDefine,
    isObjectDefine: isObjectDefine,
    isFunctionDefine: isFunctionDefine,
    isCommonJsWrapper: isCommonJsWrapper,
    isNamedDefine: isNamedDefine,
    isInsideModuleDef: isInsideModuleDef
};
