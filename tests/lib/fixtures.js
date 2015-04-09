"use strict";

module.exports = {
    define: {

        // Always Invalid
        EMPTY: "define();",
        NONSENSE: "define('foo', 'bar', false);",
        MULTIPLE: "define({ foo: 'bar' }); define(function () { return true; })",

        // Valid unless disabled
        OBJECT: "define({ a: 'foo', b: 'bar' });",
        FUNCTION: "define(function () { return true; });",
        COMMONJS_1: "define(function (require) { var a = require('path/to/a'), b = require('path/to/b'); return true; });",
        COMMONJS_2: "define(function (require, exports) { var a = require('path/to/a'), b = require('path/to/b'); return true; });",
        COMMONJS_3: "define(function (require, exports, module) { var a = require('path/to/a'), b = require('path/to/b'); return true; });",
        AMD: "define(['path/to/a', 'path/to/b'], function (a, b) { return true; });",
        AMD_EMPTY: "define([], function () { return true; });",
        AMD_NAMED: "define('path/to/c', ['path/to/a', 'path/to/b'], function (a, b) { return true; });",
        AMD_NAMED_EMPTY: "define('path/to/c', [], function () { return true; });"

    },

    exports: {

        // Always Invalid
        ASSIGN_EXPORTS: "define(function (require, exports) { exports = { foo: 'bar' }; });",

        // Valid unless disabled
        MODIFY_EXPORTS: "define(function (require, exports) { exports.foo = 'bar'; });",
        ASSIGN_MODULE_EXPORTS: "define(function (require, exports, module) { module.exports = { foo: 'bar' }; });",
        NO_CJS_ASSIGN_EXPORTS: "exports = { foo: 'bar' };"
    }
};
