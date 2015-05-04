# Disallow invalid `require` or `requirejs` calls (no-invalid-require)

## Rule Details

This rule aims to prevent malformed `require` calls.

The following patterns are considered warnings:

```js
// String literal for dependency list
require('foo', function (foo) {
    /* ... */
});

// Missing dependency list
require(function () {
    /* ... */
});

// `define` was probably what was intended here
require({
    foo: 'bar'
});
```

The following patterns are not warnings:

```js
// Dependency list provided as array
require(['foo'], function (foo) {
    /* ... */
});

// `require` inside Simplified CommonJS Wrapper
define(function (require) {
    var foo = require('foo');
    /* ... */
});
```
## When Not To Use It

You should probably *not* disable this rule.

## Further Reading

* [Invalid Require Call](http://requirejs.org/docs/errors.html#requireargs)
