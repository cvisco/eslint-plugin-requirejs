# Disallow invalid forms of `define` (no-invalid-define)

## Rule Details

This rule aims to prevent malformed `define` calls.

Any pattern except for the following are warnings:

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

You should probably *not* disable this rule.

## Further Reading

* [Define a Module](http://requirejs.org/docs/api.html#define)

## Related Rules

* [no-multiple-define](no-multiple-define.md)
* [no-object-define](no-object-define.md)
* [no-function-define](no-function-define.md)
* [no-amd-define](no-amd-define.md)
* [no-named-define](no-named-define.md)
* [no-commonjs-wrapper](no-commonjs-wrapper.md)




