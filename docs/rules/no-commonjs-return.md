# Disallow use of `return` statement in a module definition when using Simplified CommonJS Wrapper (no-commonjs-return)

When using the Simplified CommonJS Wrapper, module definition functions may export a value in one of three ways; by assigning to `module.exports`, adding a property to the `exports` object, or by directly returning a value. Exporting a value via `return` is typical of AMD modules, but not CommonJS modules. If you're using the Simplified CommonJS Wrapper, you may wish to enable this rule.

Note that this rule is only in affect when using the Simplified CommonJS Wrapper form of `define`. It will *not* flag
`return` statements in AMD definitions or simple function definitions.

## Rule Details

This rule aims to prevent exporting module values with `return`.

The following patterns are considered warnings:

```js
define(function (require) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    return function () { /* ... */ };
});
```

The following patterns are not warnings:

```js
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
```

## When Not To Use It

If you want to allow exporting a module value using the `return` statement, then it is safe to disable this rule.

## Further Reading

* [Define a Module with Simplified CommonJS Wrapper](http://requirejs.org/docs/api.html#cjsmodule)
