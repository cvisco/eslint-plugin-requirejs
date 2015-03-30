# Disallow use of simple function definition form of `define` (no-function-define)

## Rule Details

This rule aims to prevent usage of simple function definitions.

The following patterns are considered warnings:

```js
define(function () {
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

// Definition Function with No Dependencies
define([], function () {
    /* ... */
});

// Definition Function with Dependencies
define(['path/to/foo', 'path/to/bar'], function (foo, bar) {
    /* ... */
});

// Named module
define('path/to/baz', ['path/to/foo'], function (foo) {
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

If you want to use simple definition functions with no dependency list, then it is safe to disable this rule.

## Further Reading

* [Definition Functions](http://requirejs.org/docs/api.html#deffunc)
