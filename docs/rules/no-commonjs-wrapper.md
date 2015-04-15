# Disallow use of the Simplified CommonJS Wrapper form of `define` (no-commonjs-wrapper)

The Simplified CommonJS Wrapper is a way to easily reuse CommonJS modules in the browser. It may not work reliably in some cases, however. Depending on your projects needs or stylistic preference, you may wish to prevent use of this feature.

## Rule Details

This rule aims to prevent usage of wrapped CommonJS-style module definitions.

The following patterns are considered warnings:

```js
define(function (require) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    return function () { /* ... */ };
});

define(function (require, exports) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    exports.doSomething = function () { /* ... */ };
});

define(function (require, exports, module) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    module.exports = {
        doSomething: function () { /* ... */ };
    }
});

// Named CommonJS module
define('path/to/baz', function (require, exports, module) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    module.exports = {
        doSomething: function () { /* ... */ };
    }
});
```

The following patterns are not warnings:

```js
// Simple Name/Value Pairs
define({
    a: 'foo',
    b: 'bar'
});

// Simple Definition Function
define(function () {
    /* ... */
});

// Definition Function with Dependency Array
define(['path/to/foo', 'path/to/bar'], function (foo, bar) {
    /* ... */
});
```

## When Not To Use It

If you want to use the Simplified CommonJS Wrapper, then it is safe to disable this rule.

## Further Reading

* [Define a Module with Simplified CommonJS Wrapper](http://requirejs.org/docs/api.html#cjsmodule)
