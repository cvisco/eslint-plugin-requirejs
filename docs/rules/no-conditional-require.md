# Disallow use of conditional `require` calls (no-conditional-require)

If you are using [r.js](http://requirejs.org/docs/optimization.html) to create an optimized build of your project, or using a third-party module loader such as [Almond](https://github.com/jrburke/almond), you may wish to avoid conditional loading of dependencies, as it might not be possible to optimize these.

## Rule Details

This rule aims to prevent usage of `require` inside of a conditional statement or expression.

The following patterns are considered warnings:

```js
if (someCondition) {
    require(['a', 'b'], function (a, b) {
       /* ... */
    });
}

define(function (require) {
    if (someCondition) {
        var lib = require('lib');
        /* ... */
    }
});

define(function (require) {
    var lib = someCondition ? require('a') : require('b');
    /* ... */
});
```

The following patterns are not warnings:

```js
define(['a', 'b'], function (a, b) {
    /* ... */
});

define(function (require) {
    var a = require('a');
    /* ... */
});
```

## When Not To Use It

If you want to use conditionally loaded modules, then it is safe to disable this rule.

## Further Reading

* [RequireJS Optimizer](http://requirejs.org/docs/optimization.html)
* [Almond Restrictions](https://github.com/jrburke/almond#restrictions)
