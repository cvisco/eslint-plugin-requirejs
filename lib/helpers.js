/**
 * @fileoverview Predicates for testing define signatures
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var COMMON_JS_ARGS = [ "require", "exports", "module" ];


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determine if supplied parameter list matches the signature of the
 * "Simplified CommonJS Wrapper". It should at least contain the `require`
 * parameter, but may also contain `exports` and `module` as well.
 *
 * @see http://requirejs.org/docs/commonjs.html
 *
 * @param  {Array}   params - the parameter list to test
 * @return {Boolean} matches commonjs wrapper params
 */
function hasCommonJsSignature(params) {
    if (params.length === 0 || params.length > 3) {
        return false;
    }

    return params.every(function (param, index) {
        return param.name === COMMON_JS_ARGS[index];
    });
}

/**
 * Determine if supplied argument list represents a plain object module.
 * This is referred to as the "Simple Name/Value Pairs" form of module in
 * the RequireJS documentation.
 *
 * @see http://requirejs.org/docs/api.html#defsimple
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} represents an object module
 */
function isObjectDef(args) {
    if (args.length !== 1) {
        return false;
    }

    return args[0].type === "ObjectExpression";
}

/**
 * Determine if supplied argument list represents a module function with
 * no dependencies.
 *
 * @see http://requirejs.org/docs/api.html#deffunc
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} represents a module function with no dependencies
 */
function isFunctionDef(args) {
    if (args.length !== 1) {
        return false;
    }

    return args[0].type === "FunctionExpression" &&
           args[0].params.length === 0;
}

/**
 * Determine if supplied argument list represents a module function with a
 * dependency list.
 *
 * @see http://requirejs.org/docs/api.html#defdep
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} represents a module function with dependencies
 */
function isAmdDef(args) {
    if (args.length !== 2) {
        return false;
    }

    return args[0].type === "ArrayExpression" &&
           args[1].type === "FunctionExpression";
}

/**
 * Determine if supplied argument list represents a named module function
 * with a dependency list.
 *
 * @see http://requirejs.org/docs/api.html#modulename
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} represents a named module function
 */
function isNamedDef(args) {
    if (args.length !== 3) {
        return false;
    }

    return args[0].type === "Literal" &&
           args[1].type === "ArrayExpression" &&
           args[2].type === "FunctionExpression";
}

/**
 * Determine if supplied argument list represents a module function using
 * the "Simplified CommonJS Wrapper" form.
 *
 * @see http://requirejs.org/docs/api.html#cjsmodule
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} represents a named commonjs module wrapper
 */
function isCommonJsDef(args) {
    if (args.length !== 1) {
        return false;
    }

    return args[0].type === "FunctionExpression" &&
           hasCommonJsSignature(args[0].params);
}

/**
 * Determine if the provided argument list matches an allowed form of
 * `define`. This is determined by the rule options hash.
 *
 * @param  {Array}   args - list of `define` arguments
 * @return {Boolean} do the args match an allowed pattern
 */
function isValidDef(args) {
    return isObjectDef(args) ||
           isFunctionDef(args) ||
           isAmdDef(args) ||
           isNamedDef(args) ||
           isCommonJsDef(args);
}

/**
 * Determine if last object in provided `functions` array describes a
 * module definition function.
 *
 * @param  {Array}   functions - list of function descriptors
 * @return {Boolean} is the current function a module definition
 */
function currentFnIsModuleDef(functions) {
    var currentFn = functions[functions.length - 1];

    return currentFn && currentFn.isModuleDef;
}

/**
 * Determine if provided `node` represents a call to the `define` function.
 *
 * @param  {ASTNode} node - the node to test
 * @return {Boolean} is the node a call to `define`
 */
function isDefineCall(node) {
    return node.type === "CallExpression" &&
           node.callee.name === "define";
}


//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    isObjectDef: isObjectDef,
    isFunctionDef: isFunctionDef,
    isAmdDef: isAmdDef,
    isNamedDef: isNamedDef,
    isCommonJsDef: isCommonJsDef,
    isValidDef: isValidDef,
    currentFnIsModuleDef: currentFnIsModuleDef,
    isDefineCall: isDefineCall
};
