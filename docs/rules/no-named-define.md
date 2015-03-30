# Disallow use of named module form of `define` (no-named-define)

## Rule Details

This rule aims to prevent usage of named module definitions.

The following patterns are considered warnings:

```js
// Named module with dependencies
define('path/to/baz', ['path/to/foo'], function (foo) {
    /* ... */
});

// Named module with no dependencies
define('path/to/baz', [], function () {
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

// Definition Function
define(function () {
    /* ... */
});

// Definition Function with Dependencies
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

If you want to use named modules, then it is safe to disable this rule.

## Further Reading

* [Define a Module with a Name](http://requirejs.org/docs/api.html#modulename)
