# Disallow use of simple function definition form of `define` (no-function-define)

## Rule Details

This rule aims to prevent usage of simple function definitions. Note that this rule does not flag use of the Simplified CommonJS Wrapper form of `define`. That is considered a special form of definition function and is handled by a separate rule.

The following patterns are considered warnings:

```js
define(function () {
    /* ... */
});

define('path/to/baz', function () {
    /* ... */
});
```

The following patterns are not warnings:

```js
// Simple Name/Value Pairs
define({
    a: 'foo',
    b: 'bar'
});

// Definition Function with Dependency Array
define(['path/to/foo', 'path/to/bar'], function (foo, bar) {
    /* ... */
});

// Simplified CommonJS Wrapper
define(function (require) {
    var foo = require('path/to/foo'),
        bar = require('path/to/bar');

    /* ... */
});
```

## When Not To Use It

If you want to use simple definition functions with no dependency array, then it is safe to disable this rule.

## Further Reading

* [Definition Functions](http://requirejs.org/docs/api.html#deffunc)
