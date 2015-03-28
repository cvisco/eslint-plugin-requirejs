/**
 * @fileoverview Disallow invalid or undesired forms of `define`
 * @author Casey Visco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var opts = context.options[0] || {};

    // All RequireJS define forms are permitted by default, but may be
    // overridden by the following rule options
    var allowObject   = "allowObject"   in opts ? opts.allowObject   : true,
        allowFunction = "allowFunction" in opts ? opts.allowFunction : true,
        allowCommonJS = "allowCommonJS" in opts ? opts.allowCommonJS : true,
        allowAMD      = "allowAMD"      in opts ? opts.allowAMD      : true,
        allowNamedAMD = "allowNamedAMD" in opts ? opts.allowNamedAMD : true;

    var COMMON_JS_ARGS = [ "require", "exports", "module" ];


    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determine if supplied parameter list matches the signature of the
     * "Simplified CommonJS Wrapper". It should at least contain the `require`
     * parameter, but may also contain `exports` and `module` as well.
     *
     * @see http://requirejs.org/docs/commonjs.html
     *
     * @private
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
     * @private
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
     * @private
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
     * @private
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
     * @private
     * @param  {Array}   args - list of `define` arguments
     * @return {Boolean} represents a named module function
     */
    function isNamedAmdDef(args) {
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
     * @private
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
     * @private
     * @param  {Array}   args - list of `define` arguments
     * @return {Boolean} do the args match an allowed pattern
     */
    function isAllowedPattern(args) {
        if (allowObject && isObjectDef(args)) {
            return true;
        }

        if (allowFunction && isFunctionDef(args)) {
            return true;
        }

        if (allowCommonJS && isCommonJsDef(args)) {
            return true;
        }

        if (allowAMD && isAmdDef(args)) {
            return true;
        }

        if (allowNamedAMD && isNamedAmdDef(args)) {
            return true;
        }

        return false;
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            var args = node.arguments;

            if (node.callee.name !== "define") {
                return;
            }

            if (!isAllowedPattern(args)) {
                context.report(node, "Invalid form of `define`");
            }
        }
    };

};

