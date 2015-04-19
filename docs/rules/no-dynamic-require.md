# Disallow use of dynamically generated paths in a `require` call (no-dynamic-require)

If you are using [r.js](http://requirejs.org/docs/optimization.html) to create an optimized build of your project, or using a third-party module loader such as [Almond](https://github.com/jrburke/almond), you should avoid dynamic `require` calls, as these cannot be optimized.

## Rule Details

This rule aims to prevent usage of dynamic `require` calls.

The following patterns are considered warnings:

```js
// AMD-Style Require
var paths = someCondition ? ['a', 'b'] : ['c', 'd'];
require(paths, function (a, b) {
    /* ... */
});

require(['path/to/' + name], function (mod) {
    /* ... */
});

// Simplified CommonJS Wrapped Require
define(function (require) {
    var lib = require(someCondition ? 'a' : 'b');
    /* ... */
});

define(function (require) {
    var lib = require('path/to/' + name);
    /* ... */
});
```

The following patterns are not warnings:

```js
define(['path/to/a', 'path/to/b'], function (a, b) {
    /* ... */
});

define(function (require) {
    var a = require('path/to/a');
    /* ... */
});
```

## When Not To Use It

If you want to use dynamically-generated paths in a `require` call, then it is safe to disable this rule.

## Further Reading

* [RequireJS Optimizer](http://requirejs.org/docs/optimization.html)
* [Almond Restrictions](https://github.com/jrburke/almond#restrictions)
