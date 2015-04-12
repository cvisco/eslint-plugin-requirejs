# Disallow use of `exports` in a module definition when using Simplified CommonJS Wrapper (no-commonjs-exports)

When using the Simplified CommonJS Wrapper, module definition functions may export a value in one of three ways; by assigning to `module.exports`, adding a property to the `exports` object, or by directly returning a value. For stylistic reasons, you may wish to prevent modification of the `exports` object.

Note that this rule is only in affect when using the Simplified CommonJS Wrapper form of `define`. It will *not* flag modifications of the `exports` object in any other function.

## Rule Details

This rule aims to prevent exporting module values by modifying the `exports` object.

The following patterns are considered warnings:

```js
define(function (require, exports) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    exports.doSomething = function () { /* ... */ };
});
```

The following patterns are not warnings:

```js
define(function (require, exports, module) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    module.exports = {
        doSomething: function () { /* ... */ };
    }
});

define(function (require) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    return function () { /* ... */ };
});
```

## When Not To Use It

If you want to allow exporting a module value by modifiying the `exports` object, then it is safe to disable this rule.

## Further Reading

* [Define a Module with Simplified CommonJS Wrapper](http://requirejs.org/docs/api.html#cjsmodule)
