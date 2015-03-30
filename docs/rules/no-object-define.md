# Disallow use of Simple Name/Value Pairs form of `define` (no-object-define)

## Rule Details

This rule aims to prevent usage of plain object module definitions.

The following patterns are considered warnings:

```js
define({
    a: 'foo',
    b: 'bar'
});
```

The following patterns are not warnings:

```js
// Definition Function
define(function () {
    /* ... */
});

// Definition Function with Dependencies
define(['path/to/foo', 'path/to/bar'], function (foo, bar) {
    /* ... */
});

// Named Module with Dependencies
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

If you want to use plain object modules, then it is safe to disable this rule.

## Further Reading

* [Simple Name/Value Pairs](http://requirejs.org/docs/api.html#defsimple)
