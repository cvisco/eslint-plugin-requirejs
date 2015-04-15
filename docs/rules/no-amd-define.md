# Disallow use of AMD (dependency array) form of `define` (no-amd-define)

Traditionally, RequireJS module definitions take the form of an array of dependencies for the module followed by a definition function. In this form, the dependencies are passed to the definition function as arguments.

The trouble happens when you have a large number of dependencies for a module. Maintaining both the dependency list and the function arguments—and making sure they match—can be difficult and prone to error. In those cases it might be wise to discourage use of this pattern in favor of the Simplified CommonJS Wrapper.

## Rule Details

This rule aims to prevent usage of AMD-style module definitions.

The following patterns are considered warnings:

```js
// Module Definition with Dependency Array
define(['path/to/foo', 'path/to/bar'], function (foo, bar) {
    /* ... */
});

// Module Definition with Empty Dependency Array
define([], function () {
    /* ... */
});

// Named Module Definition with Dependency Array
define('path/to/baz', ['path/to/foo'], function (foo) {
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

// Simple Definition Function
define(function () {
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

If you want to use AMD-style module definitions, then it is safe to disable this rule.

## Further Reading

* [Definition Functions with Dependencies](http://requirejs.org/docs/api.html#defdep)
