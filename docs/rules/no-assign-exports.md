# Disallow assignment to `exports` when using Simplified CommonJS Wrapper (no-assign-exports)

## Rule Details

This rule aims to prevent assignment to the `exports` variable. This is generally an error, as assignment should be done to `module.exports` instead. This rule is only in effect when using the Simplified CommonJS Wrapper.

The following patterns are considered warnings:

```js
define(function (require, exports) {
    exports = function () {
        /* ... */
    };
});

define(function (require, exports) {
    exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
```

The following patterns are not warnings:

```js
define(function (require, exports) {
    exports.doSomething: function () {
        /* ... */
    };
});
```

## When Not To Use It

You should probably *not* disable this rule.
